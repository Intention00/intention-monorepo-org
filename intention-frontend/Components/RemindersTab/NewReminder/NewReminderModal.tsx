import { View, Text, Button, TouchableOpacity, ScrollView } from "react-native"
import { styles } from "./NewReminderModal.style"
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { TranscriberNote } from "../../ContactsTab/Transcriber/TranscribeNote";


const NewReminderModal: React.FC <{toggleModalVisibility}> = ({toggleModalVisibility})=> {

    // Placeholder for provided info
    const contact = {firstName: 'John', lastName: 'Doe'}

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
                            onPress={()=> console.log('Clicked Yes')}>

                            <Text style={styles.contactsListSelectText}>Yes</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={()=> console.log('Clicked No')}>

                            <Text style={styles.contactsListSelectText}>No</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    )
}

export {NewReminderModal}