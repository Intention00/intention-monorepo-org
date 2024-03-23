import { Button, View, Modal, SafeAreaView, StyleSheet, TouchableHighlight } from "react-native"
import { syncContacts } from "./contactService"
import { useState } from "react";
import { SyncContactSelector } from "./SyncContactSelector";
import { FontAwesome } from '@expo/vector-icons';


const SyncContactButton: React.FC <{updateContacts}> = ({updateContacts})=> {
    const [modalVisible, setModalVisible] = useState(false);

    return (

        <View>
            <TouchableHighlight style={styles.button}>
                <FontAwesome name="refresh" size={24} color="rgb(107,71,255)" onPress={()=>{setModalVisible(true)}}/>
            </TouchableHighlight>
            {/* <Button title="Sync Contacts" onPress={()=>{setModalVisible(true)}}></Button> */}

            <Modal visible={modalVisible} transparent={true} onRequestClose={()=> {setModalVisible(false)}} animationType="slide">
                    <SafeAreaView>
                        <SyncContactSelector updateContacts={updateContacts} toggleModalVisibility={()=> {setModalVisible(false)}}/>
                    </SafeAreaView>
                </Modal>
        </View>
        
    )

}

const styles = StyleSheet.create({
    button: {
        paddingLeft: 30,
        // position: 'absolute',
        alignItems: 'flex-start',
        marginTop: 0,
        paddingTop: 0
    },
})



export {SyncContactButton}