import { View, Text, FlatList, Button, TouchableOpacity } from "react-native"
import CheckBox from 'expo-checkbox';
import { useEffect, useState, useContext } from "react";
import { userIDContext } from "../UserSync/userIDContext";
import { formatContacts, saveContactsFromUser, syncContacts } from "../DisplayContacts/contactService";
import { SyncContactItem } from "./SyncContactItem";
import { receiveContactsFromBackend } from "../../Generic/backendService";
import { styles } from "./SyncContactSelector.style";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { SearchBar } from "./SyncSearch";
// Component for selecting contacts to sync with the backend

// Still need to fix select all button. If you already have some contacts synced and try
// using select all before saving new contacts, it doesn't save any of the new ones.
// It only works when no contacts are synced with DB. Probably has to do with ignore duplicates
// logic for db inserstions.
const SyncContactSelector: React.FC <{toggleModalVisibility, updateContacts}> = ({toggleModalVisibility, updateContacts})=> {
    // Retrieve the user ID from the context
    const userID = useContext(userIDContext)

    // State variables to manage contacts and selected checkboxes
    const [contacts, setContacts] = useState([]);
    const [checkedItems, setCheckedItems] = useState([]);

    // Effect hook to fetch contacts from the user's device upon component mount
    useEffect(()=> {
        (async ()=> {
            const fetchedContacts = await saveContactsFromUser();
            const formattedContacts = formatContacts(fetchedContacts);
            setContacts(formattedContacts);
        })()
    }, []);

    // Handler function for checkbox selection
    const handleCheckBoxSelection = (id)=> {
        const isChecked = checkedItems.includes(id);
        if (isChecked) {
            setCheckedItems(checkedItems.filter(idx => idx !== id));
        }
        else {
            setCheckedItems([...checkedItems, id]);
        }
    }

    // Function to save selected contacts to the backend
    const saveSelectedContacts = async()=> {
        const selectedContacts = [];
        toggleModalVisibility(false);

        // Build an array of selected contacts based on their indexes
        for (const idx of checkedItems) {
            selectedContacts.push(contacts[idx]);
        }

        // Sync selected contacts with the backend
        await syncContacts(userID, selectedContacts);

        // Update the list of contacts in the parent component
        const newContacts = await receiveContactsFromBackend(userID);
        updateContacts(newContacts);
    }

    return (
        <View style={[styles.centeredView, styles.modalView]}>
            <View style={[styles.modalBox]}>
                <View style={styles.modalHeader}>
                    <MaterialCommunityIcons style={styles.modalExit} name="window-close" onPress={toggleModalVisibility}/>
                    <View style={{flex: 1}}>
                        <Text style={styles.modalHeaderText}>Sync Contacts</Text>
                        <Text>  <SearchBar clicked={undefined} searchPhrase={undefined} setSearchPhrase={undefined} setClicked={undefined}></SearchBar></Text>
                    </View>
                </View>
              
                <View style={styles.modalTextContainer}>
                    <View>
                        <FlatList 
                            data={contacts} 
                            style={styles.contactsList} 
                            renderItem={({item, index})=> (   
                                <View style={styles.contactCheckBoxRow}>
                                    <SyncContactItem contact={item}></SyncContactItem>
                                    <CheckBox style={styles.checkbox} color={styles.checkbox.color} value={checkedItems.includes(index)} onValueChange={()=> handleCheckBoxSelection(index)}></CheckBox>
                                </View>
                        )}/>
                    </View>

                    <View style={styles.selectButtons}>
                        <TouchableOpacity
                            onPress={()=> setCheckedItems([])}>

                            <Text style={styles.contactsListSelectText}>Deselect All</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={()=> setCheckedItems([...Array(contacts.length).keys()])}>

                            <Text style={styles.contactsListSelectText}>Select All</Text>
                        </TouchableOpacity>
                    </View>

        

                </View>
                <View>
                    <TouchableOpacity
                        style={styles.saveButton}
                        onPress={saveSelectedContacts}>

                        <Text style={styles.saveText}>Save</Text>
                    </TouchableOpacity>
                </View>
                
            </View>
        </View>
    )

}

export {SyncContactSelector}