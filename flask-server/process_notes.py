from database.db import DBConnection
from audio_processing import generate_notes_summary, generate_questions, generate_conversational_style
import json
from datetime import datetime
class ProcessNotes():
    def __init__(self, note_pkg = None, model_name = None) -> None:
        self.model_name = model_name
        if note_pkg:
            self.note = note_pkg['note']
            self.contactID = note_pkg['contactID']
            
            # set the model to be used for all llm related stuff
            if note_pkg['model']:
                # temp disabled, only want to use gpt for now
                # self.model_name = note_pkg['model']
                pass
            
    
    # extracts note and contactid from json object
    def read_note(self, note_pkg):
        self.note = note_pkg['note']
        self.contactID = note_pkg['contactID']

        # set the model to be used for all llm related stuff
        if note_pkg.get('model', None):
            # temp disabled, only want to use gpt for now
            # self.model_name = note_pkg['model']
            pass
            

    # saves the note to the specified contactid in database
    def save_note(self):
        # only save if the note actually has text
        if self.note.strip():
            current_datetime = datetime.now()
            formatted_datetime = current_datetime.strftime('%Y-%m-%d %H:%M:%S')
            with DBConnection() as db_conn:
                if db_conn:
                    # Insert note to database
                    sql_statement = """
                        INSERT IGNORE INTO Notes (TranscribedNotes, ContactID, NoteDate) VALUES (%s, %s, %s);
                    """
                    db_conn.execute(sql_statement, (self.note, self.contactID, formatted_datetime))

                    # Generate a new summary of the notes with this, and save in db
                    self.save_notes_summary(self.contactID)
                    # Generates new conversation style and saves in db
                    self.save_conversation_style(self.contactID)
                    

    # Returns all the saved notes for a desired contact
    def get_notes(self, contact_id):
        with DBConnection() as db_conn:
            if db_conn:
                sql_statement = """
                    SELECT NoteDate, TranscribedNotes FROM Notes WHERE ContactID = %s;
                """
                db_conn.execute(sql_statement, (contact_id,))
                notes = db_conn.fetchall()
                formatted_notes = [{'date': note['NoteDate'], 'note': note['TranscribedNotes']} for note in notes]
                return formatted_notes
            
    # Returns a summary generated from all the notes for the specific contact
    def gen_notes_summary(self, contact_id):
        current_datetime = datetime.now()
        formatted_datetime = current_datetime.strftime('%Y-%m-%d %H:%M:%S')

        notes = self.get_notes(contact_id)
        generated_summary = generate_notes_summary(notes, formatted_datetime, contact_id, model_name=self.model_name)

        return generated_summary
    
    # Retrieves summary saved in database
    def get_summary(self, contact_id):
        with DBConnection() as db_conn:
            if db_conn:
                sql_statement = """
                    SELECT Summary FROM Contact WHERE ContactID = %s;
                """
                db_conn.execute(sql_statement, (contact_id,))

                summary = db_conn.fetchone()

                return summary['Summary']
    
    # Updates the contact's summary in the database using their notes
    def save_notes_summary(self, contact_id):
        with DBConnection() as db_conn:
            if db_conn:
                summary = self.gen_notes_summary(contact_id)
                sql_statement = """
                    UPDATE Contact SET Summary = %s WHERE ContactID = %s;
                """
                db_conn.execute(sql_statement, (summary, contact_id))

    # Obtains the most recent note from the database
    def get_newest_note(self, contact_id):
        with DBConnection() as db_conn:
            if db_conn:
                sql_statement = """
                    SELECT TranscribedNotes FROM Notes WHERE ContactID = %s
                    ORDER BY NoteDate DESC LIMIT 1;
                """
                db_conn.execute(sql_statement, (contact_id,))
                note = db_conn.fetchone()

                if note:
                    return note['TranscribedNotes']
                else:
                    return None
                
    # Cleans up the discrepancies between different llm responses to make json compatible
    def format_llm_output(self, data):
        # Remove extra characters from start
        start_idx = 0
        while(data[start_idx] != '{' and start_idx < len(data)):
            start_idx += 1

        # Special consideration for llama
        if self.model_name == 'llama3':
            try: 
                json.loads(data)
            except: 
                if data[-1] != '}' and data[-1] != '`':
                    data += '}'
                elif data[-1] == '`':
                    while data[-1] == '`':
                        data = data[:-1]
                    
                    try: 
                        json.loads(data[start_idx:])
                    except: 
                        data += '}'

        # Remove extra characters from end
        end_idx = len(data) - 1
        while(data[end_idx] != '}' and end_idx >= 0):
            end_idx -= 1

        return data[start_idx:end_idx + 1]
    

    def get_user_llm(self, contact_id):
        with DBConnection() as db_conn:
            if db_conn:
                sql_statement = """
                    SELECT Model FROM User INNER JOIN Contact on 
                    Contact.UserID = User.UserID WHERE Contact.ContactID = %s;
                """
                db_conn.execute(sql_statement, (contact_id,))
                model_data = db_conn.fetchone()
                if model_data:
                    print(f'Model was {model_data["Model"]}')
                    return model_data['Model']
                else:
                    # if failed, then use gpt
                    return 'gpt'


    # Returns some questions generated for the contact using their summary
    def get_summary_questions(self, contact_id, firstName):
        summary = self.get_summary(contact_id)
        newest_note = self.get_newest_note(contact_id)

        # If user selected finetuned models, then get the latest model_id from db to use
        if self.model_name in ("gpt_multiple", "gpt_single"):
            self.get_finetuned_model_database()

        # Gets style from db only, if it doesn't exist, currently uses nothing (no updates, cached)
        style = self.get_conversation_style(contact_id)
        string_questions, prompt = generate_questions(summary, newest_note, firstName, style, model_name=self.model_name)
        
        # Saving the latest prompt for later
        self.save_latest_prompt(contact_id, prompt)

        json_compat_str = self.format_llm_output(string_questions)

        try:
            questions = json.loads(json_compat_str)
        except:
            print('ERROR: Response JSON formatting issue')
            return ['JSON', 'Format', 'Error']
        
        formatted_questions = []

        for key, value in questions.items():
            if key != "comments":
                formatted_questions.append(value)

        return formatted_questions
    
    # Saves the last used prompt to the database
    def save_latest_prompt(self, contact_id, prompt):
        prompt_str = json.dumps(prompt)
        with DBConnection() as db_conn:
            if db_conn:
                # Insert prompt to database
                sql_statement = """
                    UPDATE Contact SET LatestPrompt = %s WHERE ContactID = %s;
                """
                db_conn.execute(sql_statement, (prompt_str, contact_id))

    # Gets the last used prompt from the database
    def get_latest_prompt(self, contact_id):
        with DBConnection() as db_conn:
            if db_conn:
                # Gets prompt from database
                sql_statement = """
                    SELECT LatestPrompt FROM Contact WHERE ContactID = %s;
                """
                db_conn.execute(sql_statement, (contact_id,))
                prompt = db_conn.fetchone()
                
                if prompt:
                    return prompt['LatestPrompt']

    # Experimental method to make the generated questions more natural and fitting
    # to the user.
    def gen_conversation_style(self, contact_id):
        notes = self.get_notes(contact_id)
        conversational_style = generate_conversational_style(notes, model_name=self.model_name)
        # print(f"Style is: {conversational_style}")
        return conversational_style
    
    # Saves generated style to the db
    def save_conversation_style(self, contact_id):
        with DBConnection() as db_conn:
            if db_conn:
                style = self.gen_conversation_style(contact_id)
                sql_statement = """
                    UPDATE Contact SET ConversationStyle = %s WHERE ContactID = %s;
                """
                db_conn.execute(sql_statement, (style, contact_id))
    
    # Retrieves style saved in database
    def get_conversation_style(self, contact_id):
        with DBConnection() as db_conn:
            if db_conn:
                sql_statement = """
                    SELECT ConversationStyle FROM Contact WHERE ContactID = %s;
                """
                db_conn.execute(sql_statement, (contact_id,))

                style = db_conn.fetchone()

                return style['ConversationStyle']
            
    # Gets the latest model_id for that specific model type from database
    def get_finetuned_model_database(self):
        with DBConnection() as db_conn:
            if db_conn:
                sql_statement = """
                    SELECT ModelID FROM FineTunedModels WHERE ModelType = %s ORDER BY CreatedAt DESC LIMIT 1;
                """
                db_conn.execute(sql_statement, (self.model_name,))
                model_id = db_conn.fetchone()

                # If it doesn't exist, then return None
                if not model_id:
                    return None
                
                self.model_name = model_id['ModelID']