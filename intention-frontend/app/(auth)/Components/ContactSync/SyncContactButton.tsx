import { Button, View, Modal, SafeAreaView } from "react-native"
import { syncContacts } from "./contactService"
import { useState } from "react";
import { SyncContactSelector } from "./SyncContactSelector";


const SyncContactButton: React.FC <{updateContacts}> = ({updateContacts})=> {
    const [modalVisible, setModalVisible] = useState(false);

    return (

        <View>
            <Button title="Sync Contacts" onPress={()=>{setModalVisible(true)}}></Button>

            <Modal visible={modalVisible} transparent={true} onRequestClose={()=> {setModalVisible(false)}} animationType="slide">
                    <SafeAreaView>
                        <SyncContactSelector updateContacts={updateContacts} toggleModalVisibility={()=> {setModalVisible(false)}}></SyncContactSelector>
                    </SafeAreaView>
                </Modal>
        </View>
        
    )

}

export {SyncContactButton}