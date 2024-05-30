import { View, Text, Modal, TouchableOpacity, ScrollView } from "react-native"
import { styles } from "./ConnectModal.style"
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useState, useEffect } from "react";
import { YesConnectedModal } from "./YesConnectedModal";
import { GenerateQuestions } from "./Transcriber/GenerateQuestions";
import { receiveScoreFromBackend, sendScoreToBackend, sendLastContactedToBackend } from "../../Generic/backendService"
import { ContactItem } from "../../ContactsTab/DisplayContacts/ContactItem";
import {styles as global } from '../../Generic/global.style'


export const sendScore =() => {
    console.log("IT WORKS")
    return true;
}

const ConnectModal: React.FC <{fullReminder, toggleModalVisibility}> = ({fullReminder, toggleModalVisibility})=> {

    // Placeholder for provided info
    // const contact = {contactID: 6, firstName: 'Hank', lastName: 'Zakroff'}
    const contact = fullReminder.contact;
    const [yesModalVisible, setYesModalVisible] = useState(false);
    const [connectionScore, setConnectionScore] = useState(0);
    const [scoreUpdated, setScoreUpdated] = useState(false);

    useEffect(()=> {
        (async ()=> {
            try {
                // get connection score, and set it in connectionScore
                const tempScore = await receiveScoreFromBackend(contact.contactID);
                setConnectionScore(tempScore.score);
            }
            catch (err) {

            }
        })()
    }, []);


    const handleConnectedYes = async ()=> {
        console.log('Clicked Yes');
            
        if (!scoreUpdated) {
            const tempScore = connectionScore + 1
            setConnectionScore(tempScore);
            const lastContacted = new Date(); // Current date and time

            const year = lastContacted.getFullYear(); // Get the year
            const month = lastContacted.getMonth() + 1; // Get the month (Note: month is zero-based, so we add 1)
            const day = lastContacted.getDate(); // Get the day
            
            // Format the date into a string
            const formattedLastContacted = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
            console.log(formattedLastContacted)
            await sendLastContactedToBackend( contact.contactID, formattedLastContacted);
            

            await sendScoreToBackend(contact.contactID, tempScore);
            setScoreUpdated(true);
            console.log(`Score: ${tempScore}`);
        } 

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
                    <View style={{flex: 1}}>
                        <Text style={styles.modalHeaderText}>Connect</Text>
                    </View>

                    <Text style={styles.scoreText}>{connectionScore}</Text>
                </View>

                <View style={styles.modalTextContainer}>

                    <ScrollView style={{marginBottom: 30}}>
                        <View style={{alignItems: 'center'}}>
                                <View style={styles.modalNameBox}>
                                    <Text style={styles.modalNameText}>{`${contact.firstName} ${contact.lastName}`}</Text>
                                </View>
                        </View>

                        <GenerateQuestions contact={contact}></GenerateQuestions>
                    </ScrollView>

                    <View style={styles.selectButtons}>
                        <TouchableOpacity
                            onPress={()=> handleConnectedYes()}
                            style={{backgroundColor:global.accentColor.color,
                                padding: 10,
                                borderRadius: 10,
                                width: '50%',
                                marginRight:'10%'
                            }}>
                            

                            <Text style={styles.contactsListSelectText}>Yes</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={()=> handleConnectedNo()}
                            style={{backgroundColor:global.accentColor.color,
                                padding: 10,
                                borderRadius: 10,
                                width: '50%'
                            }}>

                            <Text style={styles.contactsListSelectText}>No</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <Modal visible={yesModalVisible} transparent={true} onRequestClose={()=> {setYesModalVisible(false)}} animationType='fade'>
                    <YesConnectedModal contact={contact} toggleModalVisibility={toggleModalVisibility} toggleYesModalVisability={()=> setYesModalVisible(false)}></YesConnectedModal>
                </Modal>
            </View>
        </View>
    )
}

export {ConnectModal}