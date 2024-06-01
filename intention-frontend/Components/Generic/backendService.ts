 export const backendAddress = "https://intention-server.up.railway.app"
//  export const backendAddress = "http://192.168.1.27:5100"


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
        // console.log(`NEW CONTACTS RECEIVED: ${JSON.stringify(contacts_received)}`);
        return contacts_received;
        // TODO: check if response is good
    }
    catch (err) {
        throw new Error(`Error receiving contacts from backend: ${err}`);
    }


}

export const receiveSetUpContactsFromBackend = async (userID: number)=> {
    try {
        // using the address from host 0.0.0.0, makes it work on android
        const response = await fetch(`${backendAddress}/api/contacts/setup?userID=${userID}`, {
            method: 'GET',
        })

        const contacts_received = await response.json();
        return contacts_received;
    }
    catch (err) {
        throw new Error(`Error receiving already setup contacts from backend: ${err}`);
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

/**
 * Retrieves the desired user's reminders from the backend
 * 
 * @param userID
 * @returns reminders retrieved from the database
 */
export const receiveRemindersFromBackend = async (userID: number)=> {
    try {
        const response = await fetch(`${backendAddress}/api/reminders?userID=${userID}`, {
            method: 'GET',
        })

        const reminders_received = await response.json();
        // console.log(`NEW REMINDERS RECEIVED: ${JSON.stringify(reminders_received)}`);
        return reminders_received;
    }
    catch (err) {
        throw new Error(`Error receiving reminders from backend: ${err}`);
    }
}

/**
 * Retrieves the desired user's score from the backend for a particular contact
 * 
 * @param contactID 
 * @returns score obtained from database for the contact
 */
export const receiveScoreFromBackend = async (contactID: number)=> {
    try {
        const response = await fetch(`${backendAddress}/api/score?contactID=${contactID}`, {
            method: 'GET',
        })

        if (!response.ok) {
            throw new Error(`Error retrieving score from backend: ${response.status} - ${response.statusText}`);
        }

        const score_received = await response.json();

        console.log(`NEW SCORE RECEIVED: ${JSON.stringify(score_received)}`);
        return score_received;
    }
    catch (err) {
        throw new Error(`Error receiving score from backend: ${err}`);
    }
}

/**
 * Sends the desired user's score to the backend for a particular contact
 * 
 * (Thinking about this now, our implementation of the score system could be
 * exploited client-side, but that seems out of scope for this project)
 * 
 * @param contactID - contact to set score for
 * @param score - value to set the score to
 */
export const sendScoreToBackend = async (contactID: number, score: number)=> {
    try {
        const response = await fetch(`${backendAddress}/api/score`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({contactID: contactID, score: score})
        })

        if (!response.ok) {
            const errorMessage = await response.json();
            console.error(`Server returned an error: ${JSON.stringify(errorMessage)}`);
        }
    } 
    catch (error) {
        throw new Error(`Error sending score to backend: ${error}`);
    }
}

/**
 * Retrieves the desired contact's reminder from the backend
 * 
 * @param contactID
 * @returns reminder retrieved from the database
 */
export const receiveReminderFromBackend = async (contactID: number)=> {
    try {
        const response = await fetch(`${backendAddress}/api/reminder?contactID=${contactID}`, {
            method: 'GET',
        })

        if (!response.ok) {
            const errorMessage = await response.json();
            console.error(`Server returned an error: ${JSON.stringify(errorMessage)}`);
        }
        else {
            const reminder_received = await response.json();
            // console.log(`NEW REMINDER RECEIVED: ${JSON.stringify(reminder_received)}`);
            return reminder_received;
        }
    }
    catch (err) {
        throw new Error(`Error receiving reminder from backend: ${err}`);
    }
}

/**
 * Sends the desired contact's new reminder to the backend
 * 
 * @param contactID
 * @returns nothing
 */
export const sendReminderToBackend = async (contactID: number, reminder: Object)=> {
    try {
        const response = await fetch(`${backendAddress}/api/reminder?contactID=${contactID}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(reminder)
        })

        if (!response.ok) {
            const errorMessage = await response.json();
            console.log(reminder)
            console.error(`Server returned an error: ${JSON.stringify(errorMessage)}`);
            throw new Error(`Server returned an error: ${JSON.stringify(errorMessage)}`);
        }
    }
    catch (err) {
        throw new Error(`Error saving new reminder to backend: ${err}`);
    }
}

/**
 * Sends the desired contact's reminder edit to the backend
 * 
 * @param contactID
 * @returns nothing
 */
export const sendReminderEditToBackend = async (contactID: number, reminder: Object)=> {
    try {
        const response = await fetch(`${backendAddress}/api/reminder?contactID=${contactID}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            
            body: JSON.stringify(reminder)
        })

        if (!response.ok) {
            const errorMessage = await response.json();
            console.error(`Server returned an error damn: ${JSON.stringify(errorMessage)}`);
        }
    }
    catch (err) {
        throw new Error(`Error editing reminder in backend: ${err}`);
    }
}

/**
 * Deletes desired contact's reminder from the backend
 * 
 * @param contactID
 * @returns nothing
 */
export const deleteReminderFromBackend = async (contactID: number)=> {
    try {
        const response = await fetch(`${backendAddress}/api/reminder?contactID=${contactID}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json' // Ensure the correct content type
              },
              body: JSON.stringify({ contactID })
        })

        if (!response.ok) {
            const errorMessage = await response.json();
            console.error(`Server returned an error: ${JSON.stringify(errorMessage)}`);
        }
    }
    catch (err) {
        throw new Error(`Error deleting reminder from backend: ${err}`);
    }
}

/**
 * Gets the desired contact's summary from the backend
 * 
 * @param contactID
 * @returns nothing
 */
export const getSummaryFromBackend = async (contactID: number) => {
    try {
        // Make a network request to Flask server
        const response = await fetch(`${backendAddress}/api/notes-summary?contactID=${contactID}`, {
            method: 'GET',
        });
        
        if (!response.ok) {
            const errorMessage = await response.json();
            console.error(`Server returned an error: ${JSON.stringify(errorMessage)}`);
        }
        else {
            const summary_received = await response.json();
            return summary_received;
        }
    }
    catch (err) {
        throw new Error(`Error receiving summary from backend: ${err}`);
    }
        

};


export const getUserTags = async(user_id)=>{
    try {
        
        const response = await fetch(`${backendAddress}/api/tags/${user_id}`, {
            method: 'GET',
        })

        if (!response.ok) {
            const errorMessage = await response.json();
            console.error(`Server returned an error: ${JSON.stringify(errorMessage)}`);
        }
        else {
            const tags = await response.json();
            console.log("user id for usercontacts")
            console.log(user_id)
            console.log(tags)
            console.log("Get user contacts")
            return tags;
        }
    } 
    catch (error) {
        
        throw new Error(`Error retrieving user tags from backend fish: ${error}`);
    }
    
}

export const getContactTags = async(user_id, contact_id )=>{
    try {
        
        const response = await fetch(`${backendAddress}/api/contact-tags/${user_id}/${contact_id}`, {
            method: 'GET',
        })

        if (!response.ok) {
            const errorMessage = await response.json();
            console.error(`Server returned an error: ${JSON.stringify(errorMessage)}`);
        }
        else {
            const tags = await response.json();
            
            return tags;
        }
    } 
    catch (error) {
        
        throw new Error(`Error retrieving contact tags from backend : ${error}`);
    }
}

export const addContactTag = async(user_id, contact_id, tag_name)=>{
    try {
        
        const response = await fetch(`${backendAddress}/api/add-tag-to-contact/${user_id}/${contact_id}/${tag_name}`, {
            method: 'POST',
        })

        if (!response.ok) {
            const errorMessage = await response.json();
            console.error(`Server returned an error: ${JSON.stringify(errorMessage)}`);
        }
        else {
            console.log("addUserTags worked")
        }
    } 
    catch (error) {
        
        throw new Error(`Error adding contact tags from backend : ${error}`);
    }
}

export const deleteContactTag = async(user_id, contact_id, tag_name)=>{
    try {
        
        const response = await fetch(`${backendAddress}/api/delete-tag-from-contact/${user_id}/${contact_id}/${tag_name}`, {
            method: 'POST',
        })

        if (!response.ok) {
            const errorMessage = await response.json();
            console.error(`Server returned an error: ${JSON.stringify(errorMessage)}`);
        }
        else {
            console.log("deleteContactTags worked")

        }
    } 
    catch (error) {
        
        throw new Error(`Error retrieving contact tags from backend : ${error}`);
    }
}
export const addTagUser = async(user_id, tag_name)=>{
    try {
        
        const response = await fetch(`${backendAddress}/api/add-tag-user/${user_id}/${tag_name}`, {
            method: 'POST',
        })

        if (!response.ok) {
            const errorMessage = await response.json();
            console.error(`Server returned an error: ${JSON.stringify(errorMessage)}`);
        }
        else {
            console.log("addUserTags worked")
        }
    } 
    catch (error) {
        
        throw new Error(`Error adding user tags from backend : ${error}`);
    }
}

export const deleteUserTag = async(user_id, tag_name)=>{
    try {
        
        const response = await fetch(`${backendAddress}/api/delete-tag-user/${user_id}/${tag_name}`, {
            method: 'POST',
        })

        if (!response.ok) {
            const errorMessage = await response.json();
            console.error(`Server returned an error: ${JSON.stringify(errorMessage)}`);
        }
        else {
            console.log("deleteContactTags worked")
        }
    } 
    catch (error) {
        
        throw new Error(`Error deleting  user tags from backend : ${error}`);
    }
}

/**
 * Sends the desired user's model name to the backend
 * 
 * @param userID
 * @param model_name
 * @returns nothing
 */
export const sendUserModelNameToBackend = async (userID: number, modelName: string)=> {
    try {
        const response = await fetch(`${backendAddress}/api/model?userID=${userID}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({model: modelName})
        })

        if (!response.ok) {
            const errorMessage = await response.json();
            console.error(`Server returned an error: ${JSON.stringify(errorMessage)}`);
        }
    }
    catch (err) {
        throw new Error(`Error setting preferred model name in backend: ${err}`);
    }
}

/**
 * Gets the desired user's model name from the backend
 * 
 * @param userID
 * @returns model name
 */
export const receiveUserModelNameFromBackend = async (userID: number)=> {
    try {
        const response = await fetch(`${backendAddress}/api/model?userID=${userID}`, {
            method: 'GET',
        })

        if (!response.ok) {
            const errorMessage = await response.json();
            console.error(`Server returned an error: ${JSON.stringify(errorMessage)}`);
        }
        else {
            const modelName = await response.json()
            return modelName
        }
    }
    catch (err) {
        throw new Error(`Error getting preferred model name from backend: ${err}`);
    }
}

export const sendLastContactedToBackend = async (contactID: number, currentDate: string) => {
    try {
        const response = await fetch(`${backendAddress}/api/lastcontacted/${contactID}/${currentDate}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({contactID: contactID, currentDate: currentDate})
        });

        if (!response.ok) {
            const errorMessage = await response.json();
            console.error(`Server returned an error: ${JSON.stringify(errorMessage)}`);
        }
    } catch (error) {
        throw new Error(`Error sending lastContacted frontend to backend: ${error}`);
    }
}

/**
 * Sends the favorite question to the backend
 * 
 * @param contactID
 * @param question
 * @returns nothing
 */
export const sendFavoriteQuestionToBackend = async (contactID: number, question: string) => {
    try {
        const response = await fetch(`${backendAddress}/api/question/save?contactID=${contactID}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ question: question })
        });

        if (!response.ok) {
            const errorMessage = await response.json();
            console.error(`Server returned an error: ${JSON.stringify(errorMessage)}`);
        }
    } catch (err) {
        throw new Error(`Error saving favorite question to backend: ${err}`);
    }
}
