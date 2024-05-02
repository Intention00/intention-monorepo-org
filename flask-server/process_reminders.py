from database.db import DBConnection
from datetime import datetime
import pytz

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

                # convert timezone 
                db_datetime = datetime.strptime(db_reminder['StartDateTime'], '%Y-%m-%d %H:%M:%S')
                seattle_timezone = pytz.timezone('America/Los_Angeles')
                localized_start_datetime = seattle_timezone.localize(db_datetime)
                db_datetime = datetime.strptime(db_reminder['LastContacted'], '%Y-%m-%d %H:%M:%S')
                localized_last_datetime = seattle_timezone.localize(db_datetime)

                try:
                    reminder_formatted = {'reminderID': db_reminder['ReminderID'], 
                                          'contactID': db_reminder['ContactID'],
                                          'dateTime': localized_start_datetime,
                                          'lastContacted': localized_last_datetime,
                                          'frequency': db_reminder['Frequency']}
                    
                    return reminder_formatted
                
                except Exception as err:
                    print(f'Reminder retrieval failed: {err}')
                    return None
                
    # Adds the reminder for the specified contact
    def add_contact_reminder(self, contact_id, reminder):
        with DBConnection() as db_conn:
            if db_conn:
                sql_statement = """
                    INSERT INTO Reminders (ContactID, StartDateTime, Frequency) VALUES (%s, %s, %s);
                """
                db_conn.execute(sql_statement, (contact_id, reminder['dateTime'], reminder['frequency']))
                
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

                # convert timezone 
                seattle_timezone = pytz.timezone('America/Los_Angeles')

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
                                'dateTime': seattle_timezone.localize(reminder['StartDateTime'], '%Y-%m-%d %H:%M:%S'),
                                'frequency': reminder['Frequency']
                            }
                        } for reminder in db_reminders
                    ]
                    return formatted_reminders
                
                except Exception as err:
                    print(f'Reminders retrieval failed: {err}')
                    return None
