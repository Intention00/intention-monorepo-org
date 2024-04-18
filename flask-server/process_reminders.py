from database.db import DBConnection

class ProcessReminders():
    def __init__(self, user_id = -1) -> None:
        self.user_id = user_id

    def read_user(self, user_id):
        self.user_id = user_id

    # Gets all the reminders for the selected user
    def retrieve_reminders(self):
        with DBConnection() as db_conn:
            if db_conn:
                # sql_statement = """
                #     SELECT * FROM Reminders WHERE UserID = %s;
                # """
                # db_conn.execute(sql_statement, (self.user_id,))
                # db_info = db_conn.fetchall()

                # print(db_info);

                return [
                            {
                                'contact': {'contactID': -2, 'firstName': 'Month', 'lastName': 'Week1', 'number': '0000000000'}, 
                                'reminder': {'dateTime': '2024-04-16 21:30:00', 'frequency': 'monthly'}
                            },

                            {
                                'contact': {'contactID': -2, 'firstName': 'Month', 'lastName': 'Week2', 'number': '0000000000'}, 
                                'reminder': {'dateTime': '2024-04-16 16:30:00', 'frequency': 'monthly'}
                            },

                            {
                                'contact': {'contactID': -2, 'firstName': 'Month', 'lastName': 'Week3', 'number': '0000000000'}, 
                                'reminder': {'dateTime': '2024-03-17 19:30:00', 'frequency': 'monthly'}
                            },

                            {
                                'contact': {'contactID': -2, 'firstName': 'Month', 'lastName': 'Week4', 'number': '0000000000'}, 
                                'reminder': {'dateTime': '2024-04-19 19:30:00', 'frequency': 'monthly'}
                            },

                            {
                                'contact': {'contactID': -2, 'firstName': 'Jessica', 'lastName': 'Blake', 'number': '0000000000'}, 
                                'reminder': {'dateTime': '2024-04-14 18:30:00', 'frequency': 'daily'}
                            },

                            {
                                'contact': {'contactID': -2, 'firstName': 'Tristine', 'lastName': 'Timely', 'number': '0000000000'}, 
                                'reminder': {'dateTime': '2024-04-14 20:40:00', 'frequency': 'daily'}
                            },

                            {
                                'contact': {'contactID': -2, 'firstName': 'Torrik', 'lastName': 'Mornin', 'number': '0000000000'}, 
                                'reminder': {'dateTime': '2024-04-14 11:59:59', 'frequency': 'daily'}
                            },

                            {
                                'contact': {'contactID': -2, 'firstName': 'Adam', 'lastName': 'Berk', 'number': '0000000000'}, 
                                'reminder': {'dateTime': '2024-04-14 19:45:00', 'frequency': 'monthly'}
                            },

                            {
                                'contact': {'contactID': -1, 'firstName': 'Ted', 'lastName': 'Kline', 'number': '0000000000'}, 
                                'reminder': {'dateTime': '2024-04-14 12:50:00', 'frequency': 'weekly'}
                            }, 

                            {
                                'contact': {'contactID': -1, 'firstName': 'Bob', 'lastName': 'Iger', 'number': '0000000000'}, 
                                'reminder': {'dateTime': '2024-04-07 12:45:00', 'frequency': 'weekly'}
                            }, 

                            {
                                'contact': {'contactID': -2, 'firstName': 'Alex', 'lastName': 'Martelli', 'number': '0000000000'}, 
                                'reminder': {'dateTime': '2024-04-14 14:00:00', 'frequency': 'monthly'}
                            }, 

                            {
                                'contact': {'contactID': -1, 'firstName': 'Weekly', 'lastName': 'Repeat', 'number': '0000000000'}, 
                                'reminder': {'dateTime': '2024-04-8 23:59:00', 'frequency': 'weekly'}
                            }, 

                            {
                                'contact': {'contactID': -1, 'firstName': 'MaxLength', 'lastName': 'Test', 'number': '0000000000'}, 
                                'reminder': {'dateTime': '2024-04-14 23:59:00', 'frequency': 'weekly'}
                            }, 

                            {
                                'contact': {'contactID': -1, 'firstName': 'MaxLength', 'lastName': 'Test2', 'number': '0000000000'}, 
                                'reminder': {'dateTime': '2024-04-14 23:59:00', 'frequency': 'weekly'}
                            }, 
                        ]