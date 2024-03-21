import { Button, View, Modal, SafeAreaView } from "react-native"
import { syncContacts } from "./contactService"
import { userIDContext } from "../UserSync/userIDContext";
import { useContext, useState } from "react";
import { SyncContactSelector } from "./SyncContactSelector";


const SyncContactButton: React.FC = ()=> {
    const [modalVisible, setModalVisible] = useState(false);

    const userID = useContext(userIDContext)
    return (

        <View>
            <Button title="Sync Contacts" onPress={()=>{syncContacts(userID); setModalVisible(true)}}></Button>

            <Modal visible={modalVisible} transparent={true} onRequestClose={()=> {setModalVisible(false)}} animationType="slide">
                    <SafeAreaView>
                        <SyncContactSelector toggleModalVisibility={()=> {setModalVisible(false)}}></SyncContactSelector>
                    </SafeAreaView>
                </Modal>
        </View>
        
    )

}

export {SyncContactButton}