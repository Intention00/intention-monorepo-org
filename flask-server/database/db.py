from dotenv import load_dotenv

# Load environment variables from the .env file
load_dotenv()
import os
import mysql.connector

class DBConnection:
  def __init__(self) -> None:
    load_dotenv()

    self.host = os.getenv("DATABASE_HOST")
    self.user = os.getenv("DATABASE_USERNAME")
    self.passwd = os.getenv("DATABASE_PASSWORD")
    self.db = os.getenv("DATABASE")
    self.autocommit = True
    self.ssl_verify_identity = True
    self.ssl_ca = '/etc/ssl/cert.pem'


  # can use notation of "with DBConnection() as db_conn:". acts similar to opening a file with "with"
  def __enter__(self):
    try:
      self.connection = mysql.connector.connect(
        host = self.host,
        user = self.user,
        passwd = self.passwd,
        db = self.db,
        autocommit = self.autocommit,
        ssl_verify_identity = self.ssl_verify_identity,
        ssl_ca = self.ssl_ca
      )
      self.cursor = self.connection.cursor(dictionary=True)
      return self.cursor
    
    except Exception as conn_error:
      print('ERROR while connecting to database: ', conn_error)
      return None

  

  def __exit__(self, exc_type, exc_val, exc_tb):
    try:
      self.cursor.close()
      self.connection.close()

    except AttributeError as err:
      print('ERROR, DB connection failed: ', err)

# Testing DB Class
  
# print('About to start db retrieval...')
# with DBConnection() as db_conn:
#   if db_conn:
#     db_conn.execute("""
#       SHOW TABLES;
#     """)
#     results = db_conn.fetchall()
#     for table in results:
#       print(table)