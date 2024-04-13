import { View, Modal, SafeAreaView, TouchableHighlight } from "react-native"
import { useState } from "react";
import { SyncContactSelector } from "./SyncContactSelector";
import { FontAwesome } from '@expo/vector-icons';
import { styles } from "./SyncContactButton.style";
import { styles as global } from "../../Generic/global.style";

// This component represents a button used to trigger contact synchronization
const SyncContactButton: React.FC <{updateContacts}> = ({updateContacts})=> {
    // State to manage the visibility of the modal for selecting contacts to sync
    const [modalVisible, setModalVisible] = useState(false);

    return (
        <View>
            <TouchableHighlight style={styles.button}>
                <FontAwesome name="refresh" size={24} color={global.accentColor.color} onPress={()=>{setModalVisible(true)}}/>
            </TouchableHighlight>
            <Modal visible={modalVisible} transparent={true} onRequestClose={()=> {setModalVisible(false)}} animationType="slide">
                    <SafeAreaView>
                        <SyncContactSelector updateContacts={updateContacts} toggleModalVisibility={()=> {setModalVisible(false)}}/>
                    </SafeAreaView>
                </Modal>
        </View>
    )
}

export {SyncContactButton}