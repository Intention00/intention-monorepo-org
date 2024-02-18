import { View, Text, Button, TextInput, TouchableOpacity, StyleSheet } from "react-native"
import React, { useState, useEffect } from "react";
import { Audio } from "expo-av"
import { sendNotesToBackend, sendFinalNotesToBackend } from "../ContactSync/backendService";
import { Feather } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const TranscriberNote: React.FC <{contact}> = ({contact})=> {
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
        await Audio.setAudioModeAsync({ 
            allowsRecordingIOS: false,});
        const uri = recording.getURI();
        console.log('Recording stopped and stored at', uri);
        setAudioUri(uri);
        console.log("URI TEST VALUE AT END IS:", audioUri);
        const transcribedNotes = await sendNotesToBackend(uri);
            if (transcribedNotes) {
        setTranscribedText(transcribedNotes);
    }
    }

    // Function to test audio, Button was removed.
    const [sound, setSound] = useState(undefined);
    async function playSound() {
        try {
            console.log('Loading Sound');
            console.log("URI TEST VALUE AT START OF AUDIO IS:", audioUri);
            const { sound } = await Audio.Sound.createAsync({uri: audioUri});
            setSound(sound);
            console.log('Playing Sound');
            await sound.playAsync();
        }
        catch (err) {
            console.error("Failed to load sound", err);
        }
    }

    useEffect(() => {
        return sound ? () => {
            console.log('Unloading Sound');
            sound.unloadAsync();
        } : undefined;
    }, [sound]);

    // audio test end

    // async function updateNoteBox() {
    //     const transcribedNotes = await sendNotesToBackend(audioUri);
    //     if (transcribedNotes) {
    //         setTranscribedText(transcribedNotes);
    //     }

    // }

    // testing text input button
    const [transcribedText, setTranscribedText] = useState('')


    // ==============================================================================================
    // AI Generations
    // ==============================================================================================
    
    // AI Generating Declarations
    const [summary, setSummary] = useState<string>("");
    const [questions, setQuestions] = useState<string>("");
    
    // Summarize Button Logic
    const generateSummary = async () => {
        try {
            // Make a network request to Flask server
            const response = await fetch('http://127.0.0.1:5100/generate-summary', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ text: transcribedText }), // Use the text from the top textbox
            });

            // Handle the response
            const data = await response.json();
            const generatedSummary = data.summary;

            // Update the state with the generated summary
            setSummary(generatedSummary);
            
        } catch (error) {
            console.error('Error generating summary:', error);
        }
    };

    // Questions Button Logic
    const generateQuestions = async () => {
        try {
            // Make a network request to Flask server
            const response = await fetch('http://127.0.0.1:5100/generate-questions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ text: transcribedText }), // Use the text from the top textbox
            });

            // Handle the response
            const data = await response.json();
            const generatedQuestions = data.questions;

            // Update the state with the generated questions
            setQuestions(generatedQuestions);

        } catch (error) {
            console.error('Error generating questions:', error);
        }
    };

    
    return (
        // Modal Container
        <View style={{flex: 1, flexDirection: "column"}}>

            {/* Transcriber section */}
            <View style={{flexDirection: 'row'}}>
                <TextInput             
                    multiline
                    value={transcribedText}
                    placeholder="Press once to record, twice to stop"
                    onChangeText={setTranscribedText}
                    style={styles.notesInput}
                />
                <View style={styles.buttonBox}>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={recording ? stopRecording : startRecording}
                        >
                        <Feather name="mic" size={24} color="black" />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => sendFinalNotesToBackend(transcribedText, contact.contactID)}>
                        <Feather name="save" size={24} color="black" />
                    </TouchableOpacity>
                </View>
            </View>

            {/* Summary Section*/}
            <View style={{flexDirection: 'row'}}>
                <TextInput
                    style = {styles.notesInput}
                    multiline
                    numberOfLines={4}
                    value={summary}
                    onChangeText={(text) => setSummary(text)}
                    placeholder="No notes yet :)"
                />
                <View style={styles.buttonBox}>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={generateSummary}>
                        <MaterialIcons name="summarize" size={24} color="black" />
                        <Text style={styles.buttonText}>Summarize</Text>

                    </TouchableOpacity>
                </View>
            </View>
            
            {/* Questions Section */}
            <View style={{flexDirection: 'row'}}>
                <TextInput
                    style = {styles.notesInput}
                    multiline
                    numberOfLines={4}
                    value={questions}
                    onChangeText={(text) => setQuestions(text)}
                    placeholder="No Questions Yet"
                />
                <View style={styles.buttonBox}>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={generateQuestions}>
                        {/* <MaterialCommunityIcons name="head-lightbulb-outline" size={24} color="black" /> */}
                        <MaterialCommunityIcons name="head-lightbulb" size={30} color="black" />
                        <Text style={styles.buttonText}>Questions</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}
const styles = StyleSheet.create ({
    notesInput: {
        maxHeight: 100,
        borderColor: 'gray', 
        borderWidth: 1, 
        padding: 10,
        borderRadius: 20, 
        marginBottom: 10, 
        width: 250,
    },

    button: {
        backgroundColor: 'lightblue',
        padding: 6,
        borderRadius: 10,
        marginTop: 10,
        alignItems: 'center',
    },

    buttonText: {
      color: 'rgb(25, 25, 25)', 
      fontSize: 12,
      fontWeight: 'bold',
    },

    buttonBox: {
        flex: 1, 
        padding: 5, 
        justifyContent: 'center', 
        paddingBottom: 20,
    }

})
export {TranscriberNote};