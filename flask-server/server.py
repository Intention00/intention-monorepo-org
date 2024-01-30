from flask import Flask, request, jsonify
from flask_cors import CORS
from process_contacts import ProcessContacts
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
      

@app.route("/")
def home():
    return "Hello World"

# Retrieves a list of contacts from the frontend
@app.route("/api/contacts", methods=["POST"])
def receive_data():
    try: 
        data = request.get_json()
        contacts_processor.read_contacts(data)

        return jsonify({'message': 'Data received.'})
    
    except Exception as err:
        return jsonify({'message': str(err)})
    
@app.route("/api/contacts", methods=['GET'])
def send_data():
    return jsonify(contacts_processor.contacts)

# Retrieves notes from frontend
@app.route("/api/notes", methods=["POST"])
def receive_notes():
    try: 

        print(f'FILES: {request.files}')
        if 'file' not in request.files:
            return jsonify({'error': 'No file part in form'}), 400
        
        file = request.files['file']

        if file.filename == '':
            return jsonify({'error': 'File is empty'}), 400
        
        # temp file save to folder
        save_folder = '/temp_audio/'
        os.makedirs(save_folder, exist_ok=True)
        file_path = os.path.join(save_folder, file.filename)
        file.save(file_path)

        print(f'NOTES: {file}')

        return jsonify({'message': 'Notes file uploaded successfully'}), 200

    
    except Exception as err:
        return jsonify({'message': str(err)}), 500

if __name__ == "__main__":
    # added host to test, it seems to make it work on android
    app.run(debug=True,  port=5100, host='0.0.0.0')