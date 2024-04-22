from database.db import DBConnection
class ProcessTags():

    def __init__(self, contacts = [], ) -> None:
        self.contactsWTags = contacts
        
    def add_contactID(self, contacts):
        self.contactsWTags = contacts


    def add_tag(self, tagName):
        self.tags.append(tagName)
    
    def remove_tag(self, tagName):
        #logic to remove tag
        return

    

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
            if db_conn is None: 
                print("failed to connect with database")
                return []
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

            
    #DELETES tag by getting userid, finding the tagID with tag name, and removing all tags associated with 
    #the specific users contacts
    def delete_tag_db(self, user_id, tagName):
        with DBConnection() as db_conn:
            if db_conn:
            # Start a transaction
                db_conn.begin()

                try:
                # Find the tagID associated with the tagName and userID
                    find_tag_sql = """
                SELECT TagID FROM Tags WHERE UserID = %s AND TagName = %s;
                """
                    cursor = db_conn.cursor()
                    cursor.execute(find_tag_sql, (user_id, tagName))
                    tag_record = cursor.fetchone()

                    if tag_record:
                        tag_id = tag_record[0]

                    # Delete all associations of this tag with contacts for this user
                        delete_contact_tags_sql = """
                    DELETE FROM ContactTags WHERE TagID = %s;
                    """
                        cursor.execute(delete_contact_tags_sql, (tag_id,))

                    # Delete the tag itself from the Tags table
                        delete_tag_sql = """
                    DELETE FROM Tags WHERE TagID = %s;
                    """
                        cursor.execute(delete_tag_sql, (tag_id,))

                    # Commit the transaction
                        db_conn.commit()

                        return True  # Indicate success
                    else:
                    # No tag found with the provided name and user ID
                        db_conn.rollback()  # Roll back the transaction
                        return False  # Indicate failure
                except Exception as e:
                # Handle any exception, rollback the transaction and re-raise the exception
                    db_conn.rollback()
                    raise


    
        