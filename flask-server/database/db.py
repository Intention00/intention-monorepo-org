from dotenv import load_dotenv

# Load environment variables from the .env file
load_dotenv()
import os
import mysql.connector

# Connect to the database
connection = mysql.connector.connect(
  host=os.getenv("DATABASE_HOST"),
  user=os.getenv("DATABASE_USERNAME"),
  passwd=os.getenv("DATABASE_PASSWORD"),
  db=os.getenv("DATABASE"),
  autocommit=True,
  ssl_verify_identity=True,
  ssl_ca='/etc/ssl/cert.pem'
)

cursor = connection.cursor(dictionary=True)

cursor.execute("""
  SHOW TABLES;
""")

tables = cursor.fetchall()

print("Tables are: ")
for table in tables:
  print(table)

# cursor.execute("""
# CREATE TABLE Contact ( 

#     ContactID INT NOT NULL AUTO_INCREMENT PRIMARY KEY, 

#     FirstName VARCHAR(255) NOT NULL, 

#     LastName VARCHAR(255) NOT NULL, 

#     UserID INT NOT NULL,

#     LastContactedDate DATETIME, 

#     ContactFrequency INT, 

#     Phone VARCHAR(15), 

#     Email VARCHAR(255), 

#     BucketID INT NULL

# ); 
# """)

cursor.close()
connection.close()

# try:
#     # Create a cursor to interact with the database
#     cursor = connection.cursor()

#     # Execute "SHOW TABLES" query
#     cursor.execute("SHOW TABLES")

#     # Fetch all the rows
#     tables = cursor.fetchall()

#     # Print out the tables
#     print("Tables in the database:")
#     for table in tables:
#         print(table[0])

# except mysql.connector.Error as e:
#     print("MySQL Error:", e)

# finally:
#     # Close the cursor and connection
#     cursor.close()
#     connection.close()
