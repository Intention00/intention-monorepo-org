from database.db import DBConnection

class ProcessUsers():
    def __init__(self, email = "") -> None:
        self.email = email

    # saves the user's email as a data member
    def read_user(self, email):
        self.email = email

    # Returns the userid for the given email, and creates new
    # entry if the user doesn't already exist.
    def retrieve_user_id(self):
        with DBConnection() as db_conn:
            if db_conn:
                # Insert new user if it is one, otherwise ignore
                sql_statement = """
                    INSERT IGNORE INTO User (Email) VALUES (%s);
                """
                db_conn.execute(sql_statement, (self.email,))

                # Get the userid for that new user we just added
                sql_statement = """
                    SELECT UserID FROM User WHERE Email = %s;
                """
                db_conn.execute(sql_statement, (self.email,))
                db_info = db_conn.fetchall()

                # Something went wrong
                if len(db_info) == 0:
                    return -1

                db_user_id = db_info[0]
                print(f"userID from DB: {db_user_id}; for email: {self.email}")
                return db_user_id
            
    #this is used for test script logic, will get email based on user ID returned and check 
    #to make sure the user logged in is the same as the users info we are accessing.... 
    def retrieve_user_email(user_id):
        with DBConnection() as db_conn:
            if db_conn: 
                sql_statement= """
                SELECT Email FROM User WHERE UserID = %s;
                """            
            db_conn.execute(sql_statement, (user_id,))
            db_info = db_conn.fetchall()

            if len(db_info) == 0:
                return {'Email': -1}
            
            db_email = db_info[0]
            print(f"email from DB: {db_email}; for UserId: {user_id}") 
            return db_email
            #ask raj how this logic works sos :::: 
        
    # Deletes only the user's data from database: includes contacts, notes- everything
    # except the user itself
    def delete_user_data(self, user_id):
        with DBConnection() as db_conn:
            if db_conn:
                # Handles deleting all their contact related notes
                delete_notes = """
                    DELETE Notes FROM Contact INNER JOIN Notes on 
                    Contact.ContactID = Notes.ContactID WHERE Contact.UserID = %s;
                """
                
                # Deletes notes
                db_conn.execute(delete_notes, (user_id,))
                deleted_notes = db_conn.rowcount

                # Deletes contacts
                delete_contacts = """
                    DELETE Contact from Contact WHERE UserID = %s;
                """

                db_conn.execute(delete_contacts, (user_id,))
                deleted_contacts = db_conn.rowcount

                # Should probably return something to the route in server folder to show if successful-
                # currently just prints how many notes and contacts were deleted
                print(f"Deleted {deleted_notes} notes and {deleted_contacts} contacts.")
    
    # Deletes full user from database- everything
    def delete_user(self, user_id):
        # Delete all the user's data first
        self.delete_user_data(user_id)
        with DBConnection() as db_conn:
            if db_conn:
                # Deletes the user itself
                sql_statement = """
                    DELETE User from User WHERE UserID = %s;
                """

                db_conn.execute(sql_statement, (user_id,))
                deleted_users = db_conn.rowcount

                # Again, should return something to route, but currently 
                # prints num of users deleted (should be just 1)
                print(f"Deleted {deleted_users} users.")