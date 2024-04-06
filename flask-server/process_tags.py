from database.db import DBConnection
class ProcessTags():

    def __init__(self, tagNames = []) -> None:
        self.tags = tagNames

    def __init__(self, tagNames = [], tagLimit = 5)-> None:
        self.tags = tagNames
        self.limit = tagLimit

    def add_tag(self, tagName):
        self.tags.append(tagName)

    

    def check_tag_limit(self, user_id):
        with DBConnection() as db_conn:
            if db_conn:
                sql_statement = """
                    "SELECT COUNT(*) FROM Tags WHERE user_id = %s"
                    """
            cursor = db_conn.cursor()
            cursor.execute(sql_statement, (user_id,))
            row_count = cursor.fetchone()[0]
            return row_count
        
    
    
    def retrieve_db_contact_tag(self, user_id, contact_id):
        with DBConnection() as db_conn: 
            if db_conn:
                sql_statement = """
                SELECT t.tag_id, t.tag_name
                FROM Tags t
                JOIN ContactTags ct ON t.tag_id = ct.tag_id
                JOIN Contacts c ON ct.contact_id = c.contact_id
                WHERE c.contact_id = %s AND c.user_id = %s;
                """
            cursor = db_conn.cursor()
            cursor.execute(sql_statement, (contact_id, user_id))
            return cursor.fetchall()

    def add_tag_db(self, user_id, contact_id):
        if self.limit <= self.check_tag_limit:
            with DBConnection() as db_conn: 
                if db_conn: 
                    sql_statement = """ 

                        """
                cursor = db_conn.cursor()
                cursor.execute(sql_statement, (contact_id, user_id))
                return cursor.fetchall()
            
        else: 
            pass 
            #what should i make logic be for if add tag cant happen, just leave it? 
            #what should it return?  a -1? 

            
    
   # def delete_tag_db(self, user_id, contact_id, tagName):

    
        