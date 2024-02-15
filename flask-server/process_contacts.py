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
                        SELECT ContactID, FirstName, LastName, Phone FROM Contact WHERE UserID = %s;
                    """
                    db_conn.execute(sql_statement, (user_id,))
                    db_contacts = db_conn.fetchall()

                    self.contacts = [
                        {
                            'contactID': contact['ContactID'],
                            'firstName': contact['FirstName'],
                            'lastName': contact['LastName'],
                            'number': contact['Phone']
                        } for contact in db_contacts
                    ]

                    # print(f'Contacts for {user_id}: ')
                    # for contact in self.db_contacts:
                    #     print(contact)

    # work in progress to insert in contacts that aren't already in the database
    def sync_contacts(self, user_id):
        with DBConnection() as db_conn:
            # if db_conn:
            #     sql_statement = """
            #         INSERT IGNORE INTO Contact (FirstName, LastName, UserID, Phone) VALUES (%s, %s, %s, %s);
            #     """
            #     for contact in self.contacts:
            #         db_conn.execute(sql_statement, (contact['firstName'], contact['lastName'], user_id, contact['number']))
            if db_conn:
                # check each contact
                for contact in self.contacts:

                    # check for duplicates
                    sql_statement = """
                        SELECT * FROM Contact WHERE UserID = %s AND Phone = %s;
                    """
                    db_conn.execute(sql_statement, (user_id, contact['number']))
                    existing_contact = db_conn.fetchone()

                    # if duplicate, then don't add to db, might need to add update logic later
                    if existing_contact:
                        # do nothing
                        print(f"Contact called: {self.contacts['firstName']} {self.contacts['lastName']} already exists!")
                    
                    # if not duplicate, insert to db
                    else:
                        sql_statement = """
                            INSERT INTO Contact (FirstName, LastName, UserID, Phone) VALUES (%s, %s, %s, %s);
                        """
                        db_conn.execute(sql_statement, (contact['firstName'], contact['lastName'], user_id, contact['number']))