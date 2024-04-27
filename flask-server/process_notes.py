from database.db import DBConnection
from audio_processing import generate_notes_summary
from audio_processing import generate_questions
import json
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
            with DBConnection() as db_conn:
                if db_conn:
                    # Insert note to database
                    sql_statement = """
                        INSERT IGNORE INTO Notes (TranscribedNotes, ContactID) VALUES (%s, %s);
                    """
                    db_conn.execute(sql_statement, (self.note, self.contactID))

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

    # Returns some questions generated for the contact using their summary
    def get_summary_questions(self, contact_id, firstName):
        summary = self.get_notes_summary(contact_id)
        questions = json.loads(generate_questions(summary, firstName))
        
        formatted_questions = []

        for value in questions.values():
            formatted_questions.append(value)
        
        return formatted_questions
