from database.db import DBConnection
from audio_processing import generate_notes_summary
from audio_processing import generate_questions
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
        with DBConnection() as db_conn:
            if db_conn:
                sql_statement = """
                    INSERT IGNORE INTO Notes (TranscribedNotes, ContactID) VALUES (%s, %s);
                """
                db_conn.execute(sql_statement, (self.note, self.contactID))

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
            
    def get_notes_summary(self, contact_id):
        notes = self.get_notes(contact_id)
        generated_summary = generate_notes_summary(notes, contact_id)

        return generated_summary
    
    def get_summary_questions(self, contact_id):
        summary = self.get_notes_summary(contact_id)
        questions = generate_questions(summary)
        
        return questions


    # def get_summary(self):
    #     with DBConnection() as db_conn:
    #         if db_conn:
    #             sql_statement = """
    #                 INSERT IGNORE INTO Notes (TranscribedNotes, ContactID) VALUES (%s, %s);
    #             """
    #             db_conn.execute(sql_statement, (self.note, self.contactID))