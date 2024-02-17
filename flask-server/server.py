from flask import Flask, request, jsonify
from flask_cors import CORS
from process_contacts import ProcessContacts
from audio_processing import generate_questions, generate_summary, transcribe
from process_notes import ProcessNotes
from process_users import ProcessUsers
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
notes_processor = ProcessNotes()
user_processor = ProcessUsers()
      

@app.route("/")
def home():
    return "Hello World"

# Retrieves a list of contacts from the frontend
@app.route("/api/contacts", methods=["POST"])
def receive_data():
    try: 
        data = request.get_json()
        user_id = data['userID']
        contacts = data['contacts']
        contacts_processor.read_contacts(contacts)
        
        # gets for specific user from frontend
        contacts_processor.sync_contacts(user_id)
        return jsonify({'message': 'Contacts received.'}), 200
    
    except Exception as err:
        return jsonify({'message': str(err)})
    
@app.route("/api/contacts", methods=['GET'])
def send_data():
    user_id = request.args.get('userID')

    # gets for specific user from frontend
    contacts_processor.retrieve_db_contacts(user_id)
    return jsonify(contacts_processor.contacts), 200

# Retrieves notes to transcribe from frontend
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

        transcribed_audio = transcribe()

        return jsonify({'message': 'File saved successfully', 'data': transcribed_audio}), 200

    except Exception as err:
        return jsonify({'error': str(err)}), 500


# Retrieves notes to save from frontend
@app.route("/api/note", methods=["POST"])
def receive_note():
    try:
        data = request.get_json()
        notes_processor.read_note(data)
        notes_processor.save_note()

        return jsonify({'message': 'Note received.'}), 200
    except Exception as err:
        return jsonify({'error': str(err)}), 500
    

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

@app.route("/api/users", methods=['GET'])
def return_user_id():
    email = request.args.get('email')
    user_processor.read_user(email)
    user_id = user_processor.retrieve_user_id();

    # print(f'Email for userID was: {email}')
    return jsonify(user_id), 200

@app.route("/api/users/emailcheck", methods=['GET'])
def return_user_email():
    user_id = request.args.get('user_id')
    user_processor.retrieve_user_email(user_id)


if __name__ == "__main__":
    # added host to test, it seems to make it work on android
   app.run(debug=True,  port=5100, host='0.0.0.0')
    
    # app.run(debug=True,  port=5100)