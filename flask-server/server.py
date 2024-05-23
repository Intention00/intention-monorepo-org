from flask import Flask, request, jsonify
from flask_cors import CORS
from process_contacts import ProcessContacts
from audio_processing import generate_questions, generate_summary, transcribe
from process_notes import ProcessNotes
from process_users import ProcessUsers

from process_tags import ProcessTags

from process_reminders import ProcessReminders

import os

app = Flask(__name__)
CORS(app)

class Contact: 
    def __init__(self, firstName, lastName = '', phone = 0000000000):
        self.firstName = firstName
        self.lastName = lastName
        self.phone = phone

cont1 = Contact("John", 4252738555)
cont2 = Contact("Jane", 1234567890)

contactList = [cont1, cont2]

# Contacts processor
contacts_processor = ProcessContacts()
notes_processor = ProcessNotes(model_name="gpt")
user_processor = ProcessUsers()

tags_processor = ProcessTags()


reminders_processor = ProcessReminders()

      

@app.route("/")
def home():
    return "Hello World"

# Retrieves a list of contacts from the frontend and saves to database
@app.route("/api/contacts", methods=["POST"])
def receive_data():
    try: 
        # Sets parameters from api call
        data = request.get_json()
        user_id = data['userID']
        contacts = data['contacts']

        # Reads the received contacts in processor
        contacts_processor.read_contacts(contacts)
        
        # compares saved contacts to db contacts for user, and syncs them
        contacts_processor.sync_contacts(user_id)
        return jsonify({'message': 'Contacts received.'}), 200
    
    except Exception as err:
        return jsonify({'message': str(err)})

# Sends contacts to frontend for a specific user
@app.route("/api/contacts", methods=['GET'])
def send_data():
    try: 
        # Retrieves desired userID from frontend
        user_id = request.args.get('userID')

        # gets all contacts for specified user
        contacts_processor.retrieve_db_contacts(user_id)
       
        return jsonify(contacts_processor.contacts), 200
    
    except Exception as err:
        return jsonify({'message': str(err)}), 500


# Retrieves voice notes to transcribe from frontend
@app.route("/api/transcribe", methods=["POST"])
def receive_note_transcribe():
    try:
        # Get audio file from request
        audio_blob = request.data 

        # check if audio file exists
        if not audio_blob:
            return jsonify({'error': 'No audio data received'}), 400

        # Save the audio blob to a file with .m4a extension
        save_folder = 'temp_audio/'
        os.makedirs(save_folder, exist_ok=True)
        file_path = os.path.join(save_folder, 'recording.m4a')
        with open(file_path, 'wb') as file:
            file.write(audio_blob)

        # obtains transcribed note from processor
        transcribed_audio = transcribe()

        return jsonify({'message': 'File saved successfully', 'data': transcribed_audio}), 200

    except Exception as err:
        return jsonify({'error': str(err)}), 500


# Retrieves notes to save from frontend, and saves them in database
@app.route("/api/note", methods=["POST"])
def receive_note():
    try:
        # Extracts data from api call
        data = request.get_json()

        # sets data into notes_processor and saves note
        notes_processor.read_note(data)
        notes_processor.save_note()

        return jsonify({'message': 'Note received.'}), 200
    except Exception as err:
        return jsonify({'error': str(err)}), 500

# @app.route("/api/saved-note", methods=["GET"])
# def get_saved_note():
#     try:
#         # NEeds to implement logic to retrieve the saved note from the database
#         saved_note = retrieve_saved_note_from_database()

#         # Return the saved note in the response
#         return jsonify({'saved_note': saved_note}), 200
#     except Exception as err:
#         return jsonify({'error': str(err)}), 500
    

@app.route('/generate-summary', methods=['POST'])
def handle_generate_summary():
    # Get text from the request payload
    text = request.json.get('text', '')
    
    # Generate summary using transcriber.py
    summary = generate_summary(text)
    
    # Return the generated summary
    return jsonify({'summary': summary})

@app.route('/generate-questions', methods=['POST'])
def handle_generate_questions():
    # Get text from the request payload
    text = request.json.get('text', '')

    # Generate questions using transcriber.py
    questions = generate_questions(text)

    # Return the generated questions
    return jsonify({'questions': questions})

# Gets the user_id from the user's email
@app.route("/api/users", methods=['GET'])
def return_user_id():
    # Retrieves the email from api parameter
    email = request.args.get('email')

    # sets the email in user_processor
    user_processor.read_user(email)

    # retrieves user_id using the set email
    user_id = user_processor.retrieve_user_id();
    
    return jsonify(user_id), 200

# Retrieves the user's email using their user_id
@app.route("/api/users/emailcheck", methods=['GET'])
def return_user_email():
    user_id = request.args.get('user_id')
    user_processor.retrieve_user_email(user_id)

# Deletes the desired user's data, either full or partial delete- 
# if you add '?full=true' to end of api call, then full delete, otherwise partial
@app.route("/api/users/<user_id>", methods=['DELETE'])
def delete_user_data(user_id):
    try: 
        # checks to see if full delete is required
        full_delete = request.args.get('full', default='false').lower() == 'true'

        # if full delete, then delete user along with data
        if full_delete:
            user_processor.delete_user(user_id)
            return jsonify(), 204
        
        # if partial delete, only delete user related data, not user itself
        else:
            user_processor.delete_user_data(user_id)
            return jsonify(), 204
        
    except Exception as err:
        return jsonify({'error': str(err)}), 500
    
@app.route('/api/contact-tags/<user_id>/<contact_id>', methods=['GET'])
def get_contact_tags(user_id, contact_id):
 #   user_id = request.args.get('user_id', type=int)
   # contact_id = request.args.get('contact_id', type=int)

    if contact_id is None:
        return jsonify({'error': 'Missing user-id or contact-id'}), 400
    
    tags = tags_processor.retrieve_db_contact_tag(user_id, contact_id)
    return tags
    

@app.route('/api/add-tag-user/<user_id>/<tag>', methods=['POST'])
def add_tag_to_user(user_id, tag):

    if user_id is None:
        return jsonify({'error': 'Missing user_id or contact_id'}), 400
    
    tags_processor.add_tag_user_db(user_id, tag)
    return jsonify({'tag': tag, 'user_id': user_id,})

@app.route('/api/delete-tag-user/<user_id>/<tag>', methods=['POST'])
def delete_tag_to_user(user_id, tag):


    if user_id is None:
        return jsonify({'error': 'Missing user_id or contact_id'}), 400
    
    tags_processor.delete_tag_user_db(user_id, tag)
    return jsonify({'tag': tag, 'user_id': user_id,})

@app.route('/api/add-tag-to-contact/<user_id>/<contact_id>/<tag>', methods=['POST'])
def add_tag_to_contact(user_id, contact_id, tag):

    if user_id is None:
        return jsonify({'error': 'Missing user_id or contact_id'}), 400
    
    tags_processor.add_tag_to_contact(user_id, contact_id, tag)
    return jsonify({'tag': tag, 'user-id': user_id, 'contact': contact_id})

@app.route('/api/delete-tag-from-contact/<user_id>/<contact_id>/<tag>', methods=['POST'])
def delete_tag_from_contact(user_id, contact_id, tag):

    if user_id is None:
        return jsonify({'error': 'Missing user_id or contact_id'}), 400
    
    tags_processor.delete_tag_for_contact(user_id, contact_id, tag)
    return jsonify({'tag': tag, 'user-id': user_id, 'contact': contact_id})

#maybe dont need this , talk to raj 
@app.route("/api/tags/<user_id>", methods=['GET'])
def sendTags(user_id):
    if user_id is None: 
        return jsonify({'error': 'Missing user_id or contact_id'}), 400
    tags = tags_processor.get_user_tags(user_id)
    return tags

    

# Getting all reminders for a desired user using userID
@app.route("/api/reminders", methods=['GET'])
def return_user_reminders():
    try: 
        # getting user_id from api call
        user_id = request.args.get('userID')
        
        # setting the user_id data member to user_id
        reminders_processor.read_user(user_id)

        # retrieving all the reminders for this user
        reminders = reminders_processor.retrieve_reminders()
       
        return jsonify(reminders), 200
    
    except Exception as err:
        return jsonify({'message': str(err)}), 500
    
# Returns the current score for a specific contact from the database
@app.route("/api/score", methods=['GET'])
def return_contact_score():
    try: 
        # getting contact_id from api call
        contact_id = request.args.get('contactID')

        # retrieving score from db
        score = contacts_processor.retrieve_score(contact_id)
        return jsonify(score), 200
    
    except Exception as err:
        return jsonify({'message': str(err)}), 500
    
# Sets the contacts score to a certain value for a contact
@app.route("/api/score", methods=['PUT'])
def handle_contact_score():
    try: 
        # retrieving contactID, score from url parameters
        data = request.get_json()
        contact_id = data['contactID']
        score = data['score']

        # sets/updates the desired score for the specific 
        # contact to the database
        contacts_processor.set_score(contact_id, score)

        return jsonify({'message': 'Score set.'}), 204
    
    except Exception as err:
        return jsonify({'message': str(err)}), 500
    
# Returns the reminder for a specific contact from the database
@app.route("/api/reminder", methods=['GET'])
def return_contact_reminder():
    try: 
        # getting contact_id from api call
        contact_id = request.args.get('contactID')

        # retrieving reminder from db
        reminder = reminders_processor.retrieve_contact_reminder(contact_id)
        return jsonify(reminder), 200
    
    except Exception as err:
        return jsonify({'message': str(err)}), 500
    
# Inserts the reminder for a specific contact from the database
@app.route("/api/reminder", methods=['POST'])
def insert_contact_reminder():
    try: 
        # getting contact_id from api call
        contact_id = request.args.get('contactID')

        # Extracting data
        data = request.get_json()
        reminder_data = data['reminder']

        # insert reminder to db
        reminders_processor.add_contact_reminder(contact_id, reminder_data)
        return jsonify({'message': 'Reminder added.'}), 204
    
    except Exception as err:
        return jsonify({'message': str(err)}), 500
    
# Edits the reminder for a specific contact from the database
@app.route("/api/reminder", methods=['PUT'])
def edit_contact_reminder():
    try: 
        # getting contact_id from api call
        contact_id = request.args.get('contactID')

        # Extracting data
        data = request.get_json()
        reminder_data = data['reminder']

        # updates reminder in db
        reminders_processor.edit_contact_reminder(contact_id, reminder_data)
        return jsonify({'message': 'Reminder edited.'}), 204
    
    except Exception as err:
        return jsonify({'message': str(err)}), 500
    
# Deletes the reminder for a specific contact from the database
@app.route("/api/reminder", methods=['DELETE'])
def delete_contact_reminder():
    try: 
        # Retrieve notification data from request
        notification_data = request.get_json()
        
        # getting contact_id from api call
        contact_id = request.args.get('contactID')

        # updates reminder in db
        reminders_processor.delete_contact_reminder(contact_id)
        return jsonify({'message': 'Reminder deleted.'}), 204
    
    except Exception as err:
        return jsonify({'message': str(err)}), 500
    
# Returns all the notes for a specific contact from the database
@app.route("/api/notes", methods=['GET'])
def return_contact_notes():
    try: 
        # getting contact_id from api call
        contact_id = request.args.get('contactID')

        # retrieving reminder from db
        notes = notes_processor.get_notes(contact_id)

        return jsonify(notes), 200
    
    except Exception as err:
        return jsonify({'message': str(err)}), 500
    
# Returns summary of all the notes for a specific contact from the database
@app.route("/api/notes-summary", methods=['GET'])
def return_notes_summary():
    try: 
        # getting contact_id from api call
        contact_id = request.args.get('contactID')

        # retrieving summary from db
        summary = notes_processor.get_summary(contact_id)

        return jsonify(summary), 200
    
    except Exception as err:
        return jsonify({'message': str(err)}), 500
    
# Returns an array of questions generated from the specific contact's summary
@app.route('/api/generate-questions', methods=['GET'])
def generate_questions():
    # getting contact_id from api call
    contact_id = request.args.get('contactID')
    contact_first_name = request.args.get('firstName')

    # get optional llm model name parameter
    model_name = request.args.get('model', default=None)

    # Change to model if parameter was provided
    if model_name:
        notes_processor.model_name = model_name

    # TEMP: user db stored model name
    model_name = notes_processor.get_user_llm(contact_id)
    if model_name:
        notes_processor.model_name = model_name

    # Generate questions using transcriber.py
    questions = notes_processor.get_summary_questions(contact_id, contact_first_name)

    # Return the generated questions
    return jsonify({'questions': questions})

# Returns model name for user
@app.route("/api/model", methods=['GET'])
def return_model_name():
    try: 
        # getting user_id from api call
        user_id = request.args.get('userID')

        # retrieving model name from db
        model_name = user_processor.get_user_model(user_id)

        return jsonify(model_name), 200
    
    except Exception as err:
        return jsonify({'message': str(err)}), 500
    
# Sets model name for user
@app.route("/api/model", methods=['PUT'])
def set_model_name():
    try: 
        # getting user_id from api call
        user_id = request.args.get('userID')

        # Extracting data
        data = request.get_json()
        model_data = data['model']

        # updates model name in db
        user_processor.set_user_model(user_id, model_data)
        return jsonify({'message': 'Model name edited.'}), 204
    
    except Exception as err:
        return jsonify({'message': str(err)}), 500

if __name__ == "__main__":
    # added host to test, it seems to make it work on android
   app.run(debug=True,  port=5100, host='0.0.0.0')
    
    # app.run(debug=True,  port=5100)