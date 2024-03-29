export const backendAddress = "https://intention-server.up.railway.app"
// export const backendAddress = "http://192.168.0.73:5100"

// Send contacts to backend api
export const sendContactsToBackend = async (userID: number, contactsData: any[])=> {

    try {
        // using the address from host 0.0.0.0, makes it work on android
        const response = await fetch(`${backendAddress}/api/contacts`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },

            body: JSON.stringify({'userID': userID, 'contacts': contactsData})
    
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

// export const getSavedNoteFromBackend = async (contactID: string) => {
//     try {
//         const response = await fetch(`${backendAddress}/api/note?contactID=${contactID}`, {
//             method: 'GET',
//         });

//         if (!response.ok) {
//             const errorMessage = await response.json();
//             console.error(`Server returned an error: ${JSON.stringify(errorMessage)}`);
//             return null;
//         } else {
//             const savedNote = await response.json();
//             return savedNote.note;
//         }
//     } catch (error) {
//         throw new Error(`Error retrieving saved note from backend: ${error}`);
//     }
// }


export const receiveUserIDBackend = async (email: string)=> {
    try {
        const response = await fetch(`${backendAddress}/api/users?email=${email}`, {
            method: 'GET',
        })

        if (!response.ok) {
            const errorMessage = await response.json();
            console.error(`Server returned an error: ${JSON.stringify(errorMessage)}`);
        }
        else {
            const userID = await response.json();
            return userID;
        }
    } 
    catch (error) {
        throw new Error(`Error retrieving userID from backend: ${error}`);
    }
}


// used for testing that will happen with jest to test user authentication and make
//sure same email info from db matches user
export const recieveUserEmailBackend = async (user_id: string)=> {
    try {
        const response = await fetch(`${backendAddress}/api/users/emailcheck?user_id=${user_id}`, {
            method: 'GET',
        })

        if (!response.ok) {
            const errorMessage = await response.json();
            console.error(`Server returned an error: ${JSON.stringify(errorMessage)}`);
        }
        else {
            const email = await response.json();
            return email;
        }
    } 
    catch (error) {
        throw new Error(`Error retrieving email from backend: ${error}`);
    }
}
