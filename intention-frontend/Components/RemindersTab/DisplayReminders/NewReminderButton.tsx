import { View, Modal, SafeAreaView, TouchableHighlight } from "react-native";
import { useState } from "react";
import { AntDesign } from '@expo/vector-icons';
import { styles as global } from "../../Generic/global.style";
import { NotificationPrefs } from "../../RemindersTab/RemindersPrefs/NotificationPrefs";
import { styles } from "./NewReminderButton.style";

// This component represents a button used to trigger contact synchronization
const NewReminderButton: React.FC<{ onClose }> = ({ onClose }) => {
    // State to manage the visibility of the modal for selecting contacts to sync
    const [modalVisible, setModalVisible] = useState(false);

    const handleModalClose = () => {
        setModalVisible(false);
        onClose();
        console.log("handle modal close")
    };

    return (
        <View>
            <View style={styles.ButtonBox}>
                <TouchableHighlight style={styles.Button}>
                    <AntDesign name="plus" size={40} color={global.background.backgroundColor} onPress={() => { setModalVisible(true) }} />
                </TouchableHighlight>
            </View>

            <Modal visible={modalVisible} transparent={true} onRequestClose={handleModalClose} animationType='fade'>
                <SafeAreaView>
                    <NotificationPrefs toggleModalVisibility={handleModalClose}></NotificationPrefs>
                </SafeAreaView>
            </Modal>
        </View>
    )
}

export { NewReminderButton };
