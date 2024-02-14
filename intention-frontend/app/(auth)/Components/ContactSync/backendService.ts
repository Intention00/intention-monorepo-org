// const backendAddress = "http://192.168.1.27:5100"
//const backendAddress = "http://72.233.177.88:5100"
const backendAddress = "http://127.0.0.1:5100"

// Send contacts to backend api
export const sendContactsToBackend = async (userID: number, contactsData: any[])=> {

    try {
        const formattedContacts = contactsData.map((contact)=> {

            // TODO: Add ability to choose mobile numbers only, not just the first one

            // const phoneNumber = contact.phoneNumbers.find((number)=> {number.label === "mobile"});    
            
            // only works on ios
            // const selectedNum = contact.phoneNumbers[0].digits;
            const selectedNum = contact.phoneNumbers[0].number.replace('(', '').
                replace(')', '').replaceAll('-', '').replace(' ', '');

            return {
                firstName: contact.firstName,
                lastName: contact.lastName,
                // number: phoneNumber ? phoneNumber.number : '000-000-0000'
                number: selectedNum ? selectedNum : '0000000000'
            }
        })
        
        // using the address from host 0.0.0.0, makes it work on android
        const response = await fetch(`${backendAddress}/api/contacts`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({'userID': userID, 'contacts': formattedContacts})
    
        })

        // TODO: Need to add check if response was good 
    }
    catch (e) {
        throw new Error(`Error sending contacts to backend: ${e}`);
    }

}

export const receiveContactsFromBackend = async (userID: number)=> {
    try {
        
        // using the address from host 0.0.0.0, makes it work on android
        const response = await fetch(`${backendAddress}/api/contacts?userID=${userID}`, {
            method: 'GET',
        })

        const contacts_received = await response.json();
        console.log(`NEW CONTACTS RECEIVED: ${JSON.stringify(contacts_received)}`);
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

        // TODO: need to use fileExtension for content type later
        const fileExtension = uriParts[uriParts.length - 1];

        // convert uri file to blob for typescript
        const uri_response = await fetch(uri);
        const uri_blob = await uri_response.blob();

        const response = await fetch(`${backendAddress}/api/transcribe`, {
            method: 'POST',
            headers: {
                'Content-Type': 'audio/mp4',
            },
            body: uri_blob
    
        })

        // TODO: Need to add check if response was good   
        if (!response.ok) {
            const errorMessage = await response.json();
            console.error(`Server returned an error: ${JSON.stringify(errorMessage)}`);
        }
        else {
            const transcribedResponse = await response.json();
            const transcribedAudio = transcribedResponse['data']
            console.log(`Server returned: ${transcribedAudio}`)
            return transcribedAudio;
        }


    }
    catch (e) {
        throw new Error(`Error sending notes to backend: ${e}`);
    }
}

export const sendFinalNotesToBackend = async (note: string, contactID: string)=> {
    try {
        const response = await fetch(`${backendAddress}/api/note`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({note: note, contactID: contactID})
    
        })

        if (!response.ok) {
            const errorMessage = await response.json();
            console.error(`Server returned an error: ${JSON.stringify(errorMessage)}`);
        }
    } 
    catch (error) {
        throw new Error(`Error sending final note to backend: ${error}`);
    }
}