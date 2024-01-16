// Send contacts to backend api
export const sendContactsToBackend = async (contactsData: any[])=> {

    try {
        const formattedContacts = contactsData.map((contact)=> ({
            // name: contact.firstName + " " + contact.lastName,
            firstName: contact.firstName,
            lastName: contact.lastName,
            number: '000-000-0000'
        }))

        // using the address from host 0.0.0.0, makes it work on android
        const response = await fetch('http://192.168.1.27:5100/api/contacts', {
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
        
        // using the address from host 0.0.0.0, makes it work on android
        const response = await fetch('http://192.168.1.27:5100/api/contacts', {
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