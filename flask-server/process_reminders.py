from database.db import DBConnection
import json

class ProcessReminders():
    def __init__(self, user_id = -1) -> None:
        self.user_id = user_id

    # sets the user_id data member with specified value
    def read_user(self, user_id):
        self.user_id = user_id

    # Gets the reminder for the specified contact
    def retrieve_contact_reminder(self, contact_id):
        with DBConnection() as db_conn:
            if db_conn:
                sql_statement = """
                    SELECT * FROM Reminders WHERE ContactID = %s;
                """
                db_conn.execute(sql_statement, (contact_id,))
                db_reminder = db_conn.fetchone()

                print(f'REMINDER FOR {contact_id} WAS: {type(db_reminder["StartDateTime"])}');

                try:
                    reminder_formatted = {'reminderID': db_reminder['ReminderID'], 
                                          'contactID': db_reminder['ContactID'],
                                          'dateTime': db_reminder['StartDateTime'],
                                          'lastContacted': db_reminder['LastContacted'],
                                          'frequency': db_reminder['Frequency']}
                    
                    return reminder_formatted
                
                except Exception as err:
                    print(f'Reminder retrieval failed: {err}')
                    return None
                
    # Adds the reminder for the specified contact
    def add_contact_reminder(self, contact_id, reminder):
       
        contact_id_int = int(contact_id)
        print(type(contact_id_int))
        with DBConnection() as db_conn:
            if db_conn:
                sql_statement = """
                    INSERT INTO Reminders (ContactID, StartDateTime, Frequency) VALUES (%s, %s, %s);
                """
                db_conn.execute(sql_statement, (contact_id_int, reminder['dateTime'], reminder['frequency']))
                
    # Updates the reminder for the specified contact
    def edit_contact_reminder(self, contact_id, reminder):
        with DBConnection() as db_conn:
            if db_conn:
                sql_statement = """
                    UPDATE Reminders SET StartDateTime = %s, Frequency = %s WHERE ContactID = %s;
                """
                db_conn.execute(sql_statement, (reminder['dateTime'], reminder['frequency'], contact_id))

    # Deletes the reminder for the specified contact
    def delete_contact_reminder(self, contact_id):
        with DBConnection() as db_conn:
            if db_conn:
                sql_statement = """
                    DELETE FROM Reminders WHERE ContactID = %s;
                """
                db_conn.execute(sql_statement, (contact_id,))
                
                          
    # Gets all the reminders for the current user
    def retrieve_reminders(self):
        with DBConnection() as db_conn:
            if db_conn:
                sql_statement = """
                    SELECT c.ContactID, c.FirstName, c.LastName, c.Phone, r.StartDateTime, r.Frequency 
                    FROM Reminders AS r INNER JOIN Contact AS c ON 
                    r.ContactID = c.ContactID WHERE UserID = %s;
                """
                db_conn.execute(sql_statement, (self.user_id,))
                db_reminders = db_conn.fetchall()

                try:
                    # formatting the desired reminders the way expected by the frontend
                    formatted_reminders = [
                        {
                            'contact': {
                                'contactID': reminder['ContactID'],
                                'firstName': reminder['FirstName'],
                                'lastName': reminder['LastName'],
                                'number': reminder['Phone']
                            },
                            'reminder': {
                                'dateTime': reminder['StartDateTime'],
                                'frequency': reminder['Frequency']
                            }
                        } for reminder in db_reminders
                    ]
                    return formatted_reminders
                
                except Exception as err:
                    print(f'Reminders retrieval failed: {err}')
                    return None
