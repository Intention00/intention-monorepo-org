import { View, Text, StyleSheet, FlatList, Button } from "react-native"
import CheckBox from 'expo-checkbox';
import { useEffect, useState, useContext } from "react";
import { userIDContext } from "../UserSync/userIDContext";
import { formatContacts, saveContactsFromUser, syncContacts } from "./contactService";
import { SyncContactItem } from "./SyncContactItem";
import { receiveContactsFromBackend } from "./backendService";

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
                <View style={styles.modalTextContainer}>
                    <View style={{borderRadius: 50, marginBottom: 10}}>
                        <Text style={{textAlign: 'center', backgroundColor: 'rgb(107,71,255)', padding: 10, fontSize: 24, marginRight: 10, color: 'white',}}>Select Contacts to Sync</Text>
                    </View>
                    <View>
                        <FlatList 
                            data={contacts} 
                            style={{marginTop: 15, maxHeight: 300}} 
                            renderItem={({item, index})=> (   
                                <View style={styles.contactCheckBoxRow}>
                                    <SyncContactItem contact={item}></SyncContactItem>
                                    <CheckBox style={styles.checkbox} value={checkedItems.includes(index)} onValueChange={()=> handleCheckBoxSelection(index)}></CheckBox>
                                </View>
                        )}/>
                        
                    </View>
                    <Button title="Select All" onPress={()=> setCheckedItems([...Array(contacts.length).keys()])}></Button>
                </View>
                <View style={styles.modalExitButtons}>
                    <Button title="Save" onPress={saveSelectedContacts}></Button>
                    <Button title="Close" onPress={toggleModalVisibility}></Button>
                </View>
                
            </View>
        </View>
    )

}

// Styles for the SyncContactSelector component
const styles = StyleSheet.create({
    centeredView: {
        justifyContent: 'center',
        alignItems: 'center',
        height: '105%',
        width: '100%',
    },

    modalView: {
        backgroundColor: 'rgba(10, 10, 10, 0.5)',
    },

    modalBox: {
        height: 600,
        width: 350,
        backgroundColor: 'white',
        borderRadius: 40,
    },

    modalTextContainer: {
        paddingTop: 50,
        paddingLeft: 10,
        flex: 1,
        flexDirection: 'column',
    },
    contactCheckBoxRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        width: '100%',
    },
    checkbox: {
        alignSelf: 'center',
        marginLeft: 'auto',
    },
    modalExitButtons: {
        flexDirection: "row", 
        alignContent: 'center', 
        justifyContent: 'space-around', 
        paddingBottom: 30, 
        paddingHorizontal: 50
    }
})

export {SyncContactSelector}