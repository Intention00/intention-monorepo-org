import { View, Text, Button,ScrollView, TouchableHighlight } from "react-native"
import {TranscriberNote} from '../Transcriber/TranscribeNote'
import React, {useState} from "react";
import { Image } from 'expo-image'
import { styles } from "./ContactModal.style";
import { MaterialCommunityIcons } from '@expo/vector-icons';

const ContactModal: React.FC <{contact, toggleModalVisibility}> = ({contact, toggleModalVisibility})=> {
    const [currentStep, setCurrentStep] = useState("transcriber"); // Default to transcriber
    // const handleRecordingComplete = () => {
    //     setCurrentStep("AI_Generations");
    // };
    const blurhash = 
    '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';
    return (
        <View style={[styles.centeredView, styles.modalView]}>
            <View style={[styles.modalBox]}>
                <View style={styles.modalHeader}>
                    <MaterialCommunityIcons style={styles.modalExit} name="window-close" onPress={toggleModalVisibility}/>
                    <Text style={styles.modalHeaderText}>Contact Details</Text>
                </View>
                
                <View style={styles.modalTextContainer}>
                    <View style={{alignItems: 'center', marginBottom: 30, marginRight: 10}}>
                        <View style={styles.modalNameBox}>
                            <Text style={styles.modalText}>{`${contact.firstName} ${contact.lastName}`}</Text>
                        </View>
                            
                    </View>
                    
                    
                    <ScrollView style={{marginBottom: 30}}>
                        <TranscriberNote contact={contact}></TranscriberNote>
                    </ScrollView>
                    
                </View>
            </View>

        </View>
    )
}

export {ContactModal};