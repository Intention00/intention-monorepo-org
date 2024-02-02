from database.db import DBConnection
class ProcessNotes():
    def __init__(self, note_pkg = None) -> None:
        if note_pkg:
            self.note = note_pkg['note']
            self.contactID = note_pkg['contactID']
    
    def read_note(self, note_pkg):
        self.note = note_pkg['note']
        self.contactID = note_pkg['contactID']

    def save_note(self):
        with DBConnection() as db_conn:
            if db_conn:
                sql_statement = """
                    INSERT IGNORE INTO Notes (TranscribedNotes, ContactID) VALUES (%s, %s);
                """
                db_conn.execute(sql_statement, (self.note, self.contactID))