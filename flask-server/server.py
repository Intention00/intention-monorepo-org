from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

class Contact: 
    def __init__(self, name, phone):
        self.name = name
        self.phone = phone
cont1 = Contact("John", 4252738555)
cont2 = Contact("Jane", 1234567890)

contactList = [cont1, cont2]

      

@app.route("/")
def home():
    return "Hello World"

@app.route("/contact")
def contact():
    return {
        'name': "Ari",
        'phone': "4252738555"
    }

@app.route("/multcontact")
def multcontact():
    return "Hello multcontact"

# Retrieves a list of contacts from the frontend
@app.route("/api/contacts", methods=["POST"])
def receive_data():
    try: 
        data = request.get_json()
        print("Data: ", data)

        return jsonify({'message': 'Data received.'})
    
    except Exception as err:
        return jsonify({'message': str(err)})


if __name__ == "__main__":
    app.run(debug=True,  port=5100)
