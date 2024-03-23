import { View, Text, Button, StyleSheet,ScrollView } from "react-native"
import {TranscriberNote} from '../Transcriber/TranscribeNote'
import React, {useState} from "react";
import { Image } from 'expo-image'
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

const styles = StyleSheet.create({
    centeredView: {
        justifyContent: 'center',
        alignItems: 'center',
        height: '105%',
        width: '100%',
    },

    modalView: {
        backgroundColor: 'rgba(10, 10, 10, 0.5)',
    },

    modalBox: {
        height: 600,
        width: 350,
        backgroundColor: 'white',
        borderRadius: 40,
    },

    modalTextContainer: {
        paddingTop: 50,
        paddingLeft: 10,
        flex: 1,
        flexDirection: 'column',
        // justifyContent: 'space-between',
    },

    modalText: {
        textAlign: 'left',
        marginBottom: 20,
        fontSize: 16,
        fontWeight: '500'
    },
    image: {
        width: 120, 
        height: 120,
        borderRadius: 75,
        marginRight: 10,
    },
})

export {ContactModal};