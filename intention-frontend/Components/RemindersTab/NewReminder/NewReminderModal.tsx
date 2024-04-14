import { View, Text, Button, TouchableOpacity } from "react-native"
import { styles } from "./NewReminderModal.style"
import { MaterialCommunityIcons } from '@expo/vector-icons';


const NewReminderModal: React.FC <{toggleModalVisibility}> = ({toggleModalVisibility})=> {
    return (
        <View style={[styles.centeredView, styles.modalView]}>
            <View style={[styles.modalBox]}>
                <View style={styles.modalHeader}>
                    <MaterialCommunityIcons style={styles.modalExit} name="window-close" onPress={toggleModalVisibility}/>
                    <Text style={styles.modalHeaderText}>Connect</Text>
                </View>

                <View style={styles.modalTextContainer}>

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