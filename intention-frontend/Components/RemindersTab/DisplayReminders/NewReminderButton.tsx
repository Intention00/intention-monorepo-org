import { View, Modal, SafeAreaView, TouchableHighlight } from "react-native"
import { useState } from "react";
import { AntDesign } from '@expo/vector-icons';
import { styles as global } from "../../Generic/global.style";
import { NotificationPrefs } from "../../RemindersTab/RemindersPrefs/NotificationPrefs"
import { styles } from "./NewReminderButton.style";


// This component represents a button used to trigger contact synchronization
const NewReminderButton: React.FC <{setRefreshReminders, refreshReminders}> = ({setRefreshReminders, refreshReminders})=> {
    // State to manage the visibility of the modal for selecting contacts to sync
    const [modalVisible, setModalVisible] = useState(false);

    return (
        <View>
            <View style={styles.ButtonBox}>
                <TouchableHighlight style={styles.Button}>

                    <AntDesign name="plus" size={40} color={global.background.backgroundColor} onPress={()=>{setModalVisible(true)}}/>

                </TouchableHighlight>
            </View>
            

            <Modal visible={modalVisible} transparent={true} onRequestClose={()=> {setModalVisible(false)}} animationType='fade'>
                    <SafeAreaView>
                        <NotificationPrefs refreshReminders={refreshReminders} setRefreshReminders={setRefreshReminders} toggleModalVisibility={()=> setModalVisible(false)}></NotificationPrefs>
                    </SafeAreaView>
            </Modal>
        </View>
    )
}

export {NewReminderButton}