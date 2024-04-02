import { View, Text, Button,ScrollView } from "react-native"
import {TranscriberNote} from '../Transcriber/TranscribeNote'
import React, {useState} from "react";
import { Image } from 'expo-image'
import { styles } from "./ContactModal.style";
// import {AI_Generations} from "../AI_Generations/AI_Generations"
// import { TranscribeAndProcess } from "../AIFunctions/TranscribeAndProcess";

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
                <View style={styles.modalTextContainer}>
                    <View style={{borderRadius: 50, marginBottom: 10}}>
                        <Text style={{textAlign: 'center', backgroundColor: 'rgb(107,71,255)', padding: 10, fontSize: 24, marginRight: 10, color: 'white',}}>Contact Details</Text>
                    </View>
                    
                    <View style={{flexDirection: 'row', marginBottom: 10}}>
                        <Image
                            style={styles.image}
                            source="https:/picsum.photos/seed/696/3000/2000"
                            placeholder={blurhash}
                            contentFit="cover"
                            transition={2500}
                        />
                        <View style={{justifyContent: 'center'}}>
                            <Text style={styles.modalText}>{`${contact.firstName} ${contact.lastName}`}</Text>
                            <Text style={styles.modalText}>Phone: {contact.number}</Text>
                        </View>
                        
                    </View>
                    
                    
                    <ScrollView>
                        <TranscriberNote contact={contact}></TranscriberNote>
                        {/* <AI_Generations></AI_Generations> */}
                        {/* <TranscribeAndProcess></TranscribeAndProcess> */}
                    </ScrollView>
                    
                </View>

                <Button title="Edit Name"></Button>
                <Button title="Close" onPress={toggleModalVisibility}></Button>
                
            </View>

        </View>
    )
}

export {ContactModal};