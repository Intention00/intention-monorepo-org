from database.db import DBConnection
from audio_processing import generate_notes_summary, generate_questions, generate_conversational_style
import json
from datetime import datetime
class ProcessNotes():
    def __init__(self, note_pkg = None) -> None:
        if note_pkg:
            self.note = note_pkg['note']
            self.contactID = note_pkg['contactID']
    
    # extracts note and contactid from json object
    def read_note(self, note_pkg):
        self.note = note_pkg['note']
        self.contactID = note_pkg['contactID']

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
                    

    # Returns all the saved notes for a desired contact
    def get_notes(self, contact_id):
        with DBConnection() as db_conn:
            if db_conn:
                sql_statement = """
                    SELECT TranscribedNotes FROM Notes WHERE ContactID = %s;
                """
                db_conn.execute(sql_statement, (contact_id,))
                notes = db_conn.fetchall()
                formatted_notes = [note['TranscribedNotes'] for note in notes]

                return formatted_notes
            
    # Returns a summary generated from all the notes for the specific contact
    def get_notes_summary(self, contact_id):
        notes = self.get_notes(contact_id)
        generated_summary = generate_notes_summary(notes, contact_id)

        return generated_summary
    
    # Updates the contact's summary in the database using their notes
    def save_notes_summary(self, contact_id):
        with DBConnection() as db_conn:
            if db_conn:
                summary = self.get_notes_summary(contact_id)
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

    # Returns some questions generated for the contact using their summary
    def get_summary_questions(self, contact_id, firstName):
        summary = self.get_notes_summary(contact_id)
        newest_note = self.get_newest_note(contact_id)

        questions = json.loads(generate_questions(summary, newest_note, firstName))
        
        formatted_questions = []

        for value in questions.values():
            formatted_questions.append(value)
        
        # testing conversational_style
            self.conversation_style(contact_id)

        return formatted_questions

    def conversation_style(self, contact_id):
        notes = self.get_notes(contact_id)
        conversational_style = generate_conversational_style(notes)
        print(f"Style is: {conversational_style}")