import { View, Modal, SafeAreaView, TouchableHighlight } from "react-native"
import { useState } from "react";
import { SyncContactSelector } from "./SyncContactSelector";
import { FontAwesome } from '@expo/vector-icons';
import { styles } from "./SyncContactButton.style";
import { styles as global } from "../../Generic/global.style";
import { FontAwesome6 } from '@expo/vector-icons';

// This component represents a button used to trigger contact synchronization
const SyncContactButton: React.FC <{updateContacts}> = ({updateContacts})=> {
    // State to manage the visibility of the modal for selecting contacts to sync
    const [modalVisible, setModalVisible] = useState(false);

    return (
        <View style={styles.ButtonBox} >
            <TouchableHighlight style={styles.Button}>

                <FontAwesome6 name="contact-book" size={30} color={global.background.backgroundColor} onPress={()=>{setModalVisible(true)}} />
            </TouchableHighlight>
            <Modal visible={modalVisible} transparent={true} onRequestClose={()=> {setModalVisible(false)}} animationType="fade">
                    <SafeAreaView>
                        <SyncContactSelector updateContacts={updateContacts} toggleModalVisibility={()=> {setModalVisible(false)}}/>
                    </SafeAreaView>
                </Modal>
        </View>
    )
}

export {SyncContactButton}