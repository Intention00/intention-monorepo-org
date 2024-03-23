import { View, Text, StyleSheet, FlatList, Button,  } from "react-native"
import CheckBox from 'expo-checkbox';
import { useEffect, useState, useContext } from "react";
import { userIDContext } from "../UserSync/userIDContext";
import { formatContacts, saveContactsFromUser, syncContacts } from "./contactService";
import { SyncContactItem } from "./SyncContactItem";
import { receiveContactsFromBackend } from "./backendService";


// Still need to fix select all button. If you already have some contacts synced and try
// using select all before saving new contacts, it doesn't save any of the new ones.
// It only works when no contacts are synced with DB. Probably has to do with ignore duplicates
// logic for db inserstions.
const SyncContactSelector: React.FC <{toggleModalVisibility, updateContacts}> = ({toggleModalVisibility, updateContacts})=> {
    const userID = useContext(userIDContext)
    const [contacts, setContacts] = useState([]);
    const [checkedItems, setCheckedItems] = useState([]);

    useEffect(()=> {
        (async ()=> {
            const fetchedContacts = await saveContactsFromUser();
            const formattedContacts = formatContacts(fetchedContacts);
            setContacts(formattedContacts);
        })()
    }, []);

    const handleCheckBoxSelection = (id)=> {
        const isChecked = checkedItems.includes(id);
        if (isChecked) {
            setCheckedItems(checkedItems.filter(idx => idx !== id));
        }
        else {
            setCheckedItems([...checkedItems, id]);
        }
    }

    const saveSelectedContacts = async()=> {
        const selectedContacts = [];
        toggleModalVisibility(false);

        for (const idx of checkedItems) {
            selectedContacts.push(contacts[idx]);
        }
        await syncContacts(userID, selectedContacts);

        // update contacts to return changed contacts to ContactSync component
        const newContacts = await receiveContactsFromBackend(userID);
        updateContacts(newContacts);
    }

    return (
        <View style={[styles.centeredView, styles.modalView]}>
            <View style={[styles.modalBox]}>
                <View style={styles.modalTextContainer}>
                    <Text>Select Contacts to Sync</Text>
                    <View>
                        <FlatList 
                            data={contacts} 
                            style={{marginTop: 15, maxHeight: 600}} 
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