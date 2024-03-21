import { View, Text, StyleSheet, ScrollView, FlatList, Button } from "react-native"
import { useEffect, useState } from "react";
import { formatContacts, saveContactsFromUser } from "./contactService";
import { SyncContactItem } from "./SyncContactItem";



const SyncContactSelector: React.FC <{toggleModalVisibility}> = ({toggleModalVisibility})=> {
    const [contacts, setContacts] = useState([]);

    useEffect(()=> {
        (async ()=> {
            const fetchedContacts = await saveContactsFromUser();
            const formattedContacts = formatContacts(fetchedContacts);
            setContacts(formattedContacts);
        })()
    }, []);

    return (
        <View style={[styles.centeredView, styles.modalView]}>
            <View style={[styles.modalBox]}>
                <View style={styles.modalTextContainer}>
                    <View>
                        <Text>Select Contacts to Sync</Text>
                        <FlatList 
                            data={contacts} 
                            style={{marginTop: 15, maxHeight: 600}} 
                            renderItem={({item})=> (   
                                <SyncContactItem contact={item}></SyncContactItem>
                        )}/>
                    </View>
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
        // justifyContent: 'space-between',
    },
})

export {SyncContactSelector}