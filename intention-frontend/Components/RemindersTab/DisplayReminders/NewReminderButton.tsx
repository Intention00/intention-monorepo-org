import { View, Modal, SafeAreaView, TouchableHighlight } from "react-native"
import { useState } from "react";
import { AntDesign } from '@expo/vector-icons';
import { styles as global } from "../../Generic/global.style";
import { ConnectModal } from "../ConnectModal/ConnectModal";
import { styles } from "./NewReminderButton.style";

// This component represents a button used to trigger contact synchronization
const NewReminderButton: React.FC = ()=> {
    // State to manage the visibility of the modal for selecting contacts to sync
    const [modalVisible, setModalVisible] = useState(false);

    return (
        <View>
            <View style={styles.ButtonBox}>
                <TouchableHighlight style={styles.Button}>
                    <AntDesign name="plus" size={40} color={global.accentColor.color} onPress={()=>{setModalVisible(false)}}/>
                </TouchableHighlight>
            </View>
            

            <Modal visible={modalVisible} transparent={true} onRequestClose={()=> {setModalVisible(false)}} animationType='fade'>
                    <SafeAreaView>
                        {/* <ConnectModal toggleModalVisibility={()=> setModalVisible(false)}></ConnectModal> */}
                    </SafeAreaView>
            </Modal>
        </View>
    )
}

export {NewReminderButton}