import { View, Modal, SafeAreaView, TouchableHighlight, TouchableOpacity, Text } from "react-native"
import { useState } from "react";
import { styles } from "./SelectModelDetails.style";
import { styles as global } from "../../Generic/global.style";

import { AntDesign } from '@expo/vector-icons';

// This component represents a button used to trigger contact synchronization
const SelectModelDetails: React.FC = ()=> {
    // State to manage the visibility of the modal for selecting contacts to sync
    const [modalVisible, setModalVisible] = useState(false);

    return (
        <View style={{marginTop: 10}} >
            <TouchableOpacity onPress={() => setModalVisible(true)}>
                <AntDesign name="infocirlce" size={24} color={global.accentColor.color} />
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
                        <Text style={styles.modalText}>AI Model Comparison</Text>
                        <View>
                            <Text style={styles.modalText}>GPT-4: Versatility, natural language generation</Text>
                            <Text style={styles.modalText}>Llama3: Efficiency, task-specific focus</Text>
                            <Text style={styles.modalText}>Mixtral: Creativity, storytelling</Text>
                            <Text style={styles.modalText}>WizardLM: Logical reasoning, problem-solving</Text>
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

export {SelectModelDetails}