// Send contacts to backend api
export const sendContactsToBackend = async (contactsData: any[])=> {

    try {
        const formattedContacts = contactsData.map((contact)=> ({
            name: contact.firstName + " " + contact.lastName,
            number: '000-000-0000'
        }))
        const response = await fetch('http://127.0.0.1:5100/api/contacts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formattedContacts)
    
        })

        // TODO: Need to add check if response was good 
    }
    catch (e) {
        throw new Error(`Error sending contacts to backend: ${e}`);
    }

}

export const receiveContactsFromBackend = async ()=> {
    try {
        const response = await fetch('http://127.0.0.1:5100/api/contacts', {
            method: 'GET',
        })

        const contacts_received = await response.json();
        return contacts_received;
        // TODO: check if response is good
    }
    catch (err) {
        throw new Error(`Error receiving contacts from backend: ${err}`);
    }


}