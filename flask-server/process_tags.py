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

#should definetely have user_id here but oh well 
    def get_tagID(self, tag_name): 
        with DBConnection() as db_conn: 
            if db_conn:
                sql_statement = """
                SELECT TagID FROM Tags WHERE TagName = %s
                """
                db_conn.execute(sql_statement, (tag_name,))
                result = db_conn.fetchone()
                if result:
                    return result.get("TagID")
                else:
                    return None


    

    def check_tag_limit(self, user_id):
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
                tag_exists = result  # Access the first item of the tuple
                return tag_exists

        
    def check_contact_exists(self, user_id, contact_id):
        with DBConnection() as db_conn:
            if db_conn:
            # Prepare a SQL statement to check if a tag exists for a user
                sql_statement = """
                    SELECT EXISTS (
                        SELECT 1 FROM Contact WHERE UserID = %s AND ContactID = %s
                    )
                    """
            # Execute the SQL statement with the user ID and tag name
                db_conn.execute(sql_statement, (user_id, contact_id))
            # Fetch the result
                result = db_conn.fetchone()
            # The result is a tuple where the first item is a boolean
                contact_exists = result  # Access the first item of the tuple
                return contact_exists

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
                
#need to add a stop here if duplicate entry ..... 4/24, works fine w new data
    def add_tag_to_contact(self, user_id, contact_id, tag_name):
            if self.check_tag_exists(user_id, tag_name):
                tagID = self.get_tagID(tag_name)
                with DBConnection() as db_conn: 
                    sql_statement = """
                        INSERT INTO ContactTags (ContactID, TagID) VALUES(%s, %s)
                        """
                    db_conn.execute(sql_statement, (contact_id, tagID))
        
    
    def delete_tag_for_contact(self, user_id, contact_id, tag_name):
        if  self.check_contact_exists(user_id, contact_id):
          

            tag_id = self.get_tagID(tag_name)

            with DBConnection() as db_conn:
                sql_statement = """
                    DELETE FROM ContactTags WHERE ContactID = %s AND TagID = %s
                """

                db_conn.execute(sql_statement, (contact_id, tag_id))
            
