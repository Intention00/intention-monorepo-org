import * as Contacts from 'expo-contacts';
import { sendContactsToBackend } from '../../Generic/backendService';

// Requesting contact permission and retrieving contacts from user's device
// Returns either an array of the data if successful or an empty array if not.
export const saveContactsFromUser = async ()=> {
    try {
        // Trying to receive permission to extract contacts from user
        const {status} = await Contacts.requestPermissionsAsync();
        if (status === 'granted') {
            const { data } = await Contacts.getContactsAsync({
                // We want the names along with numbers from each contact
                fields: [
                    Contacts.Fields.FirstName,
                    Contacts.Fields.LastName,
                    Contacts.Fields.PhoneNumbers
                ]
            });
            
            // Checking to see if any contacts were extracted from the user's device
            if (data.length > 0) {
                return data;
                
            } else {
                return [];
            }
        } else {
            throw new Error('Contact permission denied!');
        }
    }
    catch (err) {
        throw new Error(`Error requesting contact information: ${err}`);
    }
}

/* 
    Used to process formatting of contacts before sending to 
    backend (used to be during backend save)
*/
export const formatContacts = (contactsData)=> {
    try {
        const formattedContacts = contactsData.map((contact)=> {
            // Check to see if number exists, otherwise ignore contact
            try {
                const numCheck = contact.phoneNumbers[0].number;
            }
            catch {
                return null;
            }

            // Added temporary way to remove +1 area code, need to adjust for more flexibility
            const selectedNum = contact.phoneNumbers[0].number.replace('(', '').
            replace(')', '').replaceAll('-', '').replace('+1 ', '').replace(' ', '');

            const firstName = contact.firstName || '';
            const lastName = contact.lastName || '';

            return {
                firstName: firstName,
                lastName: lastName,
                number: selectedNum
            }
        }).filter(contact => contact !== null);

        return formattedContacts;
    }
    catch (e) {
        return [];
    }
}

/* 
    Used to only save the selected contacts to the DB
*/
export const syncContacts = async (userID: number, contacts: any[])=> {
    await sendContactsToBackend(userID, contacts);


}