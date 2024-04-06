from database.db import DBConnection
class ProcessTags():

    def __init__(self, tagNames = []) -> None:
        self.tags = tagNames

    def add_tag(self, tagName):
        self.tags.append(tagName)

    
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

   # def delete_tag_db(self, user_id, contact_id, tagName):

    
        