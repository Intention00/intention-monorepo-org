from flask import Flask, request, jsonify
from flask_cors import CORS
from process_contacts import ProcessContacts

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

if __name__ == "__main__":
    app.run(debug=True,  port=5100)
