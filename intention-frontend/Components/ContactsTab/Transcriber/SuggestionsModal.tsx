import { View, Modal, SafeAreaView, TouchableHighlight, TouchableOpacity, Text } from "react-native"
import { useState } from "react";
import { styles } from "./SuggestionsModal.style";

import { AntDesign } from '@expo/vector-icons';

// This component represents a button used to trigger contact synchronization
const SuggestionsModal: React.FC = ()=> {
    // State to manage the visibility of the modal for selecting contacts to sync
    const [modalVisible, setModalVisible] = useState(false);

    return (
        <View>
            <TouchableOpacity style={styles.infoButton} onPress={() => setModalVisible(true)}>
                <AntDesign name="infocirlce" size={24} color={styles.icons.color} />
            </TouchableOpacity>

            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalView}>
                        <View style={{marginBottom: '5%'}}>
                            <Text style={styles.modalTextHeader}>Feel free to answer any or all of these questions:</Text>
                        </View>
                        
                        <View style={{marginBottom: '1%'}}>
                            <Text style={styles.modalText}>What sparked your bond?</Text>
                            <Text style={styles.modalText}>What role do they play in your life?</Text>
                            <Text style={styles.modalText}>How do you value this person?</Text>
                        </View>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => setModalVisible(!modalVisible)}
                        >
                            <Text style={styles.buttonText}>Close</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    )
}

export {SuggestionsModal}