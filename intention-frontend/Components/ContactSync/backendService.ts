const backendAddress = "http://192.168.1.27:5100"

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
        const response = await fetch(`${backendAddress}/api/contacts`, {
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
        const response = await fetch(`${backendAddress}/api/contacts`, {
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

export const sendNotesToBackend = async (uri: string)=> {
    try {
        // Do some processing on audio file/notes (ref: https://stackoverflow.com/a/64980847)
        const uriParts = uri.split(".");
        const fileExtension = uriParts[uriParts.length - 1];

        // convert uri file to blob for typescript
        const uri_response = await fetch(uri);
        const uri_blob = await uri_response.blob();
        console.log(`URI BLOB: ${JSON.stringify(uri_blob)}`)


        const formData = new FormData();
        formData.append('file', uri_blob, `recording.${fileExtension}`);
        
        console.log(`FORMDATA LIST: ${JSON.stringify(formData)}`)
        console.log(`BLOB SIZE: ${uri_blob.size}`);

        // using the address from host 0.0.0.0, makes it work on android
        const response = await fetch(`${backendAddress}/api/notes`, {
            method: 'POST',
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            body: formData
    
        })

        // TODO: Need to add check if response was good 
    }
    catch (e) {
        throw new Error(`Error sending notes to backend: ${e}`);
    }
}