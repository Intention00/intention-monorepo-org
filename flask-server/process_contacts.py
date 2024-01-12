import json

class ProcessContacts():
    def __init__(self, contacts = []) -> None:
        self.contacts = contacts

    def read_contacts(self, contacts):
        print('Loading json to contacts attribute...')
        self.contacts = json.loads(contacts)
        print('Done loading json to contacts attribute.')

    def clear_contacts(self):
        self.contacts.clear()

    def print_contacts(self):
        print(self.contacts)
