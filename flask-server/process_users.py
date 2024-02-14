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
                # db_conn.execute(sql_statement, ("raj@dev.com",))
                db_info = db_conn.fetchall()

                if len(db_info) == 0:
                    return {'UserID': -1}
            
                db_user_id = db_info[0]
                print(f"userID from DB: {db_user_id}; for email: {self.email}")
                return db_user_id