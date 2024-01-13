import * as Contacts from 'expo-contacts';

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
