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
                SELECT c.ContactID, c.FirstName, c.LastName, c.Phone, GROUP_CONCAT(t.TagName SEPARATOR ', ') AS Tags
                FROM Contact c
                LEFT JOIN ContactTags ct ON c.ContactID = ct.ContactID
                LEFT JOIN Tags t ON ct.TagID = t.TagID
                WHERE c.UserID = %s
                GROUP BY c.ContactID, c.FirstName, c.LastName, c.Phone;
            """
                db_conn.execute(sql_statement, (user_id,))
                db_contacts = db_conn.fetchall()

                db_conn.execute(sql_statement, (user_id,))
                db_contacts = db_conn.fetchall()

                self.contacts = [
                    {
                        'contactID': contact['ContactID'],
                        'firstName': contact['FirstName'],
                        'lastName': contact['LastName'],
                        'number': contact['Phone'],
                        'tags': contact['Tags']
                    } for contact in db_contacts
                ]

                # print(f'Contacts for {user_id}: ')
                # for contact in self.db_contacts:
                #     print(contact)

    # work in progress to insert in contacts that aren't already in the database
    def sync_contacts(self, user_id):
        with DBConnection() as db_conn:
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

    # Retrieves the current score for that specific contact
    def retrieve_score(self, contact_id):
        with DBConnection() as db_conn:
                if db_conn:
                    # Retrieve score for contact
                    sql_statement = """
                        SELECT Score FROM Contact WHERE ContactID = %s;
                    """
                    db_conn.execute(sql_statement, (contact_id,))
                    db_score = db_conn.fetchone()

                    # formats the score according to frontend expected format
                    db_score = {'score': db_score['Score']}
                    return db_score

    # Sets the new score to that provided for specified contact
    def set_score(self, contact_id, score):
        with DBConnection() as db_conn:
                if db_conn:
                    # Updates the score for a contact (all contacts start with default of 0)
                    sql_statement = """
                        UPDATE Contact SET Score = %s WHERE ContactID = %s;
                    """
                    db_conn.execute(sql_statement, (score, contact_id))

    # Saves the favorite question to the database for finetuning              
    def save_favorite_question(self, contact_id, prompt, question):
        with DBConnection() as db_conn:
                if db_conn:
                    sql_statement = """
                        INSERT INTO FineTuning (ContactID, Prompt, Question) VALUES (%s, %s, %s);
                    """
                    db_conn.execute(sql_statement, (contact_id, prompt, question))