import { View, Modal, SafeAreaView, TouchableHighlight } from "react-native"
import { useState } from "react";
import { FontAwesome } from '@expo/vector-icons';
import { styles as global } from "../../Generic/global.style";
import { ConnectModal } from "../ConnectModal/ConnectModal";

// This component represents a button used to trigger contact synchronization
const NewReminderButton: React.FC = ()=> {
    // State to manage the visibility of the modal for selecting contacts to sync
    const [modalVisible, setModalVisible] = useState(false);

    return (
        <View>
            <TouchableHighlight>
                <FontAwesome name="refresh" size={24} color={global.accentColor.color} onPress={()=>{setModalVisible(true)}}/>
            </TouchableHighlight>

            <Modal visible={modalVisible} transparent={true} onRequestClose={()=> {setModalVisible(false)}} animationType='fade'>
                    <SafeAreaView>
                        <ConnectModal toggleModalVisibility={()=> setModalVisible(false)}></ConnectModal>
                    </SafeAreaView>
            </Modal>
        </View>
    )
}

export {NewReminderButton}