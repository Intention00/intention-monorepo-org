from database.db import DBConnection
class ProcessNotes():
    def __init__(self, note = None) -> None:
        self.note = note
    
    def read_note(self, note):
        self.note = note

    def save_note(self, user_id, contact_id):
        with DBConnection() as db_conn:
            if db_conn:
                print(f'DB is saving note: {self.note}')