from database.db import DBConnection

class ProcessTags():

    def __init__(self, contacts = []) -> None:
        self.contactsWTags = contacts
        
        
    def add_contactID(self, contacts):
        self.contactsWTags = contacts


    def add_tag(self, tagName):
        self.tags.append(tagName)
    
    def remove_tag(self, tagName):
        #logic to remove tag
        return

    

   # def check_tag_limit(self, user_id):
        with DBConnection() as db_conn:
            if db_conn:
                sql_statement = """
                    
                    """
            cursor = db_conn.cursor()
            cursor.execute(sql_statement, (user_id,))
            row_count = cursor.fetchone()[0]
            return row_count
        
    def check_tag_exists(self, user_id, tag_name): 
        with DBConnection() as db_conn:
            if db_conn:
                # Prepare a SQL statement to check if a tag exists for a user
                sql_statement = """
                    SELECT EXISTS (
                        SELECT 1 FROM Tags WHERE UserID = %s AND TagName = %s
                    )
                """
                # Execute the SQL statement with the user ID and tag name
                db_conn.execute(sql_statement, (user_id, tag_name))
                # Fetch the result
                result = db_conn.fetchone()
                # The result is a tuple where the first item is a boolean
                tag_exists = result[0]
                return tag_exists
            

    #this will get contacts from db to display contact modal 
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

    #this will take user input for tag and add it to tag for user 
    def add_tag_user_db(self, user_id, tag_name):
        with DBConnection() as db_conn:
            if db_conn:
                # Prepare a SQL statement to insert a new tag for a user
                    sql_statement = """
                    INSERT INTO Tags (TagName, UserID) VALUES (%s, %s)
                """
                    db_conn.execute(sql_statement, (tag_name, user_id))
                   
               
    #function will delete tag associated with user... (need to add contacttag deletion later on)
    def delete_tag_user_db(self, user_id, tag_name):
        with DBConnection() as db_conn:
            if db_conn:
                # Prepare a SQL statement to insert a new tag for a user
                sql_statement = """
                     DELETE FROM Tags WHERE UserID = %s AND TagName = %s
                    """
                db_conn.execute(sql_statement, (user_id, tag_name))
                   
                # Execute the SQL statement with the tag name and user ID
                

    def add_tag_to_contact(self, user_id, contact_id, tag_name):
            if(self.check_tag_exists(user_id, tag_name)):
                return
        
            
    
    #DELETES tag by getting userid, finding the tagID with tag name, and removing all tags associated with 
    #the specific users contacts

    # for sql first must delete from contacttag table, and then must 
    # delete from tags  
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
                    DELETE FROM Tags WHERE TagID = %s and UserID = %s;
                    """
                        cursor.execute(delete_tag_sql, (tag_id, user_id))

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


    
        