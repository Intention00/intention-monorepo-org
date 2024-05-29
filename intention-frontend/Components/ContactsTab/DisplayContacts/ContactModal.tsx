import { View, Text, Button,ScrollView, TouchableHighlight, TouchableOpacity } from "react-native"
import {TranscriberNote} from '../Transcriber/TranscribeNote'
import React, {createContext, useState} from "react";
import { Image } from 'expo-image'
import { styles } from "./ContactModal.style";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { ContactTags } from '../../ContactsTab/ContactsTagging/ContactTags'
import { ContactItem } from "./ContactItem";
import { tagUpdater } from "../UserSync/tagUpdater";

const ContactModal: React.FC <{contact, toggleModalVisibility}> = ({contact, toggleModalVisibility})=> {
    const [currentStep, setCurrentStep] = useState("transcriber"); // Default to transcriber
    // const handleRecordingComplete = () => {
    //     setCurrentStep("AI_Generations");
    // };
    if (tagUpdater.displayName === "true") {
        tagUpdater.displayName = "false"
    }
    
    const blurhash = 
    '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';
    return (
        <View style={[styles.centeredView, styles.modalView]}>
            <View style={[styles.modalBox]}>
                <View style={styles.modalHeader}>
                    <MaterialCommunityIcons style={styles.modalExit} name="window-close" onPress={toggleModalVisibility} onPressIn={() => tagUpdater.displayName= "true"} />
                    <View style={{flex: 1}}>
                        <Text style={styles.modalHeaderText}>Contact Details</Text>
                    </View>
                </View>
                
                <View style={styles.modalTextContainer}>
                    <View style={{alignItems: 'center', marginBottom: 10}}>
                        <View style={styles.modalNameBox}>
                            <Text style={styles.modalText}>{`${contact.firstName} ${contact.lastName}`}</Text>
                        </View>

                    </View>

                    <View> 
                        <ContactTags contact={contact}></ContactTags>
                    </View>         
                    
                    <ScrollView style={{marginBottom: 30, marginTop: 10}}>
                        <TranscriberNote contact={contact}></TranscriberNote>
                        
                    </ScrollView>
                    
                </View>

                
            </View>

        </View>
    )
}

export {ContactModal};