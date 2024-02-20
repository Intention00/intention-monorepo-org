from database.db import DBConnection

class ProcessUsers():
    def __init__(self, email = "") -> None:
        self.email = email

    def read_user(self, email):
        self.email = email

    def retrieve_user_id(self):
        with DBConnection() as db_conn:
            if db_conn:
                sql_statement = """
                    SELECT UserID FROM User WHERE Email = %s;
                """
                db_conn.execute(sql_statement, (self.email,))
                db_info = db_conn.fetchall()

                if len(db_info) == 0:
                    sql_statement = """
                        INSERT INTO User (Email) VALUES (%s);
                    """
                    db_conn.execute(sql_statement, (self.email,))
                    db_info = db_conn.fetchall()

                    if len(db_info) == 0:
                        return {'UserID': -1}
            
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