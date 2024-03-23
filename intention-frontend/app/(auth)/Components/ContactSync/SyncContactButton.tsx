import { View, Modal, SafeAreaView, StyleSheet, TouchableHighlight } from "react-native"
import { useState } from "react";
import { SyncContactSelector } from "./SyncContactSelector";
import { FontAwesome } from '@expo/vector-icons';

// This component represents a button used to trigger contact synchronization
const SyncContactButton: React.FC <{updateContacts}> = ({updateContacts})=> {
    // State to manage the visibility of the modal for selecting contacts to sync
    const [modalVisible, setModalVisible] = useState(false);

    return (
        <View>
            <TouchableHighlight style={styles.button}>
                <FontAwesome name="refresh" size={24} color="rgb(107,71,255)" onPress={()=>{setModalVisible(true)}}/>
            </TouchableHighlight>
            <Modal visible={modalVisible} transparent={true} onRequestClose={()=> {setModalVisible(false)}} animationType="slide">
                    <SafeAreaView>
                        <SyncContactSelector updateContacts={updateContacts} toggleModalVisibility={()=> {setModalVisible(false)}}/>
                    </SafeAreaView>
                </Modal>
        </View>
    )
}

// Stylesheet for the SyncContactButton component
const styles = StyleSheet.create({
    // Adjustments for the button's position and appearance
    button: {
        paddingLeft: 30,
        // position: 'absolute',
        alignItems: 'flex-start',
        marginTop: 0,
        paddingTop: 0
    },
})

export {SyncContactButton}