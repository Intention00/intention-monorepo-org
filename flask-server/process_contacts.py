from database.db import DBConnection
class ProcessContacts():
    def __init__(self, contacts = []) -> None:
        self.contacts = contacts

    def read_contacts(self, contacts):
        self.contacts = contacts

    def add_contact(self, contact): 
        self.contacts.append(contact)


    def clear_contacts(self):
        self.contacts.clear()

    def print_contacts(self):
        print(self.contacts)

    # Getting contacts from DB and saving them in contacts variable
    def retrieve_db_contacts(self, user_id):
            with DBConnection() as db_conn:
                if db_conn:
                    sql_statement = """
                        SELECT ContactID, FirstName, LastName FROM Contact WHERE UserID = %s;
                    """
                    db_conn.execute(sql_statement, (user_id,))
                    db_contacts = db_conn.fetchall()

                    self.contacts = [
                        {
                            'contactID': contact['ContactID'],
                            'firstName': contact['FirstName'],
                            'lastName': contact['LastName']
                        } for contact in db_contacts
                    ]

                    # print(f'Contacts for {user_id}: ')
                    # for contact in self.db_contacts:
                    #     print(contact)

    # work in progress to insert in contacts that aren't already in the database
    def sync_contacts(self, user_id):
        with DBConnection() as db_conn:
            if db_conn:
                sql_statement = """
                    INSERT IGNORE INTO Contact (FirstName, LastName, UserID) VALUES (%s, %s, %s);
                """
                for contact in self.contacts:
                    db_conn.execute(sql_statement, (contact['firstName'], contact['lastName'], user_id))