import { View, Text, Modal, TouchableOpacity, ScrollView } from "react-native"
import { styles } from "./NewReminderModal.style"
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { TranscriberNote } from "../../ContactsTab/Transcriber/TranscribeNote";
import { useState, useEffect } from "react";
import { YesConnectedModal } from "./YesConnectedModal";


const NewReminderModal: React.FC <{toggleModalVisibility}> = ({toggleModalVisibility})=> {

    // Placeholder for provided info
    const contact = {contactID: 6, firstName: 'Hank', lastName: 'Zakroff'}
    const [yesModalVisible, setYesModalVisible] = useState(false);
    const [connectionScore, setConnectionScore] = useState(0);

    useEffect(()=> {
        (async ()=> {
            try {
                // get connection score, and set it in connectionScore
            }
            catch (err) {

            }
        })()
    }, []);

    const handleConnectedYes = ()=> {
        console.log('Clicked Yes');

        const tempScore = connectionScore + 1
        setConnectionScore(tempScore);
        console.log(`Score: ${tempScore}`);

        setYesModalVisible(true);

        // Close Modal to disallow further clicking, task is over
        // toggleModalVisibility();
    }

    const handleConnectedNo = ()=> {
        console.log('Clicked No');

        // Add logic to reset score if wanted

        // Close Modal to disallow further clicking, task is over
        // toggleModalVisibility();
    }

    return (
        <View style={[styles.centeredView, styles.modalView]}>
            <View style={[styles.modalBox]}>
                <View style={styles.modalHeader}>
                    <MaterialCommunityIcons style={styles.modalExit} name="window-close" onPress={toggleModalVisibility}/>
                    <Text style={styles.modalHeaderText}>Connect</Text>
                </View>

                <View style={styles.modalTextContainer}>

                    <View style={{alignItems: 'center', marginBottom: 30, marginRight: 10}}>
                            <View style={styles.modalNameBox}>
                                <Text style={styles.modalNameText}>{`${contact.firstName} ${contact.lastName}`}</Text>
                            </View>
                    </View>

                    <ScrollView style={{marginBottom: 30}}>
                        <TranscriberNote contact={contact}></TranscriberNote>
                    </ScrollView>

                    <View style={styles.selectButtons}>
                        <TouchableOpacity
                            onPress={()=> handleConnectedYes()}>

                            <Text style={styles.contactsListSelectText}>Yes</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={()=> handleConnectedNo()}>

                            <Text style={styles.contactsListSelectText}>No</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <Modal visible={yesModalVisible} transparent={true} onRequestClose={()=> {setYesModalVisible(false)}} animationType='fade'>
                    <YesConnectedModal toggleModalVisibility={()=> setYesModalVisible(false)}></YesConnectedModal>
                </Modal>
            </View>
        </View>
    )
}

export {NewReminderModal}