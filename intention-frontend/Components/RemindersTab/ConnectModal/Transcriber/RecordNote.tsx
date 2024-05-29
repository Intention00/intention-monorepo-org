import { View, Text, TextInput, TouchableOpacity, Vibration } from "react-native"
import React, { useState } from "react";
import { Audio } from "expo-av"
import { sendNotesToBackend, sendFinalNotesToBackend } from "../../../Generic/backendService";
import { Feather } from '@expo/vector-icons';
import { styles } from "./RecordNote.style";

const RecordNote: React.FC <{contact, modalToggle, yesModalToggle}> = ({contact, modalToggle, yesModalToggle})=> {
    // Transcription Declarations
    const [recording, setRecording] = useState(undefined);
    const [permissionResponse, requestPermission] = Audio.usePermissions();
    const [audioUri, setAudioUri] = useState(undefined);

    // Microphone button START-RECORDING
    async function startRecording() {
        try {
            if (permissionResponse.status !== 'granted') {
                console.log('Requesting permission..');
                await requestPermission();
            }
            await Audio.setAudioModeAsync({
                allowsRecordingIOS: true,
                playsInSilentModeIOS: true,
            });

            console.log('Starting recording..');
            const { recording } = await Audio.Recording.createAsync(Audio.RecordingOptionsPresets.HIGH_QUALITY);
            setRecording(recording);
            console.log('Recording started');
        } 
        catch (err) {
            console.error('Failed to start recording', err);
        }
    }

    // Microphone Button STOP-RECORDING
    async function stopRecording() {
        console.log('Stopping recording..');
        setRecording(undefined);

        await recording.stopAndUnloadAsync();
        await Audio.setAudioModeAsync({allowsRecordingIOS: false});
        const uri = recording.getURI();

        console.log('Recording stopped and stored at', uri);

        setAudioUri(uri);
        console.log("URI TEST VALUE AT END IS:", audioUri);

        const transcribedNotes = await sendNotesToBackend(uri);
        if (transcribedNotes) {
            setTranscribedText(transcribedNotes);
        }
    }

    const handleSave = ()=> {
        sendFinalNotesToBackend(transcribedText, contact.contactID)
        yesModalToggle();
        modalToggle();
    }

    const handleClose = ()=> {
        yesModalToggle();
        // modalToggle();
    }

    // testing text input button
    const [transcribedText, setTranscribedText] = useState('')


    // ==============================================================================================
    // AI Generations
    // ==============================================================================================
    
    return (
        // // Notes transcription component
        <View style={{flex: 1, flexDirection: "column"}}>
            {/* Transcriber section */}
            <View style={{flexDirection: 'row'}}>
                <TextInput
                    multiline
                    value={transcribedText}
                    placeholder="Press once to record, twice to stop"
                    placeholderTextColor={styles.placeHolderTextColor.color}
                    onChangeText={setTranscribedText}
                    style={styles.notesInput}
                />
                <View style={styles.buttonBox}>
                    <TouchableOpacity
                        style={[styles.button, recording ? styles.recordingButton : styles.notRecordingButton]}
                        onPress={recording ? stopRecording : startRecording}>
                        
                        <Feather name="mic" size={24} color={styles.icons.color} />
                    </TouchableOpacity>              
                </View>
            </View>

            <View style={styles.exitButtons}>
                <TouchableOpacity
                    // style={styles.saveButton}
                    onPressOut={() => {Vibration.vibrate(130);}}
                    onPress={() => handleSave()}>

                    <Text style={styles.saveText}>Save</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    // style={styles.saveButton}
                    onPress={() => handleClose()}>

                    <Text style={styles.exitText}>Close</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export {RecordNote};