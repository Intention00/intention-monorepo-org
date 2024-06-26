
import { View, Text, FlatList, Button, TouchableOpacity, Vibration } from "react-native"

import CheckBox from 'expo-checkbox';
import { useEffect, useState, useContext } from "react";
import { userIDContext } from "../UserSync/userIDContext";
import { formatContacts, saveContactsFromUser, syncContacts } from "../DisplayContacts/contactService";
import { SyncContactItem } from "./SyncContactItem";
import { receiveContactsFromBackend } from "../../Generic/backendService";
import { styles } from "./SyncContactSelector.style";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { SearchBar } from "./SyncSearch";
import { styles as global} from '../../Generic/global.style'

const SyncContactSelector: React.FC<{ toggleModalVisibility, updateContacts }> = ({ toggleModalVisibility, updateContacts }) => {
    const userID = useContext(userIDContext);
    const [contacts, setContacts] = useState([]);
    const [checkedItems, setCheckedItems] = useState([]);
    const [searchPhrase, setSearchPhrase] = useState("");
    const [clicked, setClicked] = useState(false);
    const [filteredContacts, setFilteredContacts] = useState([]);

    useEffect(() => {
        (async () => {
            const fetchedContacts = await saveContactsFromUser();
            
            const formattedContacts = formatContacts(fetchedContacts);
            setContacts(formattedContacts);
            setFilteredContacts(formattedContacts); // Initialize filteredContacts
        })();
    }, []);

    useEffect(() => {
      //  console.log("Search phrase updated:", searchPhrase); //
        if (searchPhrase === "") {
            setFilteredContacts(contacts);
        } else {
            const filtered = contacts.filter(contact => {
                const fullName = `${contact.firstName} ${contact.lastName}`.toLowerCase();
                return fullName.includes(searchPhrase.toLowerCase());

        });
            setFilteredContacts(filtered);
        }
    }, [searchPhrase, contacts]);
    

    const handleCheckBoxSelection = (index) => {
        const isChecked = checkedItems.includes(index);
        isChecked ? setCheckedItems(checkedItems.filter(idx => idx !== index)) : setCheckedItems([...checkedItems, index]);
    };

    const saveSelectedContacts = async () => {
        const selectedContacts = checkedItems.map(idx => contacts[idx]);
        await syncContacts(userID, selectedContacts);
        toggleModalVisibility(false);
        updateContacts(await receiveContactsFromBackend(userID));
    };

    return (
        <View style={[styles.centeredView, styles.modalView]}>
            <View style={[styles.modalBox]}>
                
                <View style={styles.modalHeader}>
                    <View style={{ flex: 1 }}>
                        <View style={{flexDirection: 'row'}}>
                            <MaterialCommunityIcons style={styles.modalExit} name="window-close" onPress={toggleModalVisibility}/>
                            <Text style={styles.modalHeaderText}>Sync Contacts</Text>
                        </View>
                        <View style={{marginTop: 15}}>
                            <SearchBar
                                clicked={clicked}
                                searchPhrase={searchPhrase}
                                setSearchPhrase={setSearchPhrase}
                                setClicked={setClicked}
                            />
                        </View>
                        
                    </View>
                </View>

                <FlatList
                    data={filteredContacts}
                    style={styles.contactsList}
                    renderItem={({ item, index }) => (
                        <View style={styles.contactCheckBoxRow}>
                            <SyncContactItem contact={item}/>
                            <View>
                            
                            </View>

    
                            <CheckBox
                                style={styles.checkbox}
                                value={checkedItems.includes(contacts.indexOf(item))}
                                onValueChange={() => handleCheckBoxSelection(contacts.indexOf(item))}
                                    color={checkedItems.includes(contacts.indexOf(item)) ? global.accentColor.color : undefined}
                            />
                        </View>
                    )}
                />
                <View style={styles.selectButtons}>
                    <TouchableOpacity style={{backgroundColor:global.accentColor.color,
                                padding: 10,
                                borderRadius: 10,
                                width: '50%',
                                marginRight:'5%'
                            }} onPress={() => setCheckedItems([])}>
                        <Text style={styles.contactsListSelectText}>Deselect All</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{backgroundColor:global.accentColor.color,
                                padding: 10,
                                borderRadius: 10,
                                width: '50%',
                            }} onPress={() => setCheckedItems([...Array(contacts.length).keys()])}>
                        <Text style={styles.contactsListSelectText}>Select All</Text>

                    </TouchableOpacity>
                  
                  
                </View>
                <View>
                    <TouchableOpacity
                        style={styles.saveButton}
                        onPressOut={() => {
                            Vibration.vibrate(130);
                        }}
                        
                        onPress={saveSelectedContacts}>
                        <Text style={styles.saveText}>Save</Text>
                    </TouchableOpacity>
                
                  </View>
            </View>
        </View>
    );
};

export { SyncContactSelector };
