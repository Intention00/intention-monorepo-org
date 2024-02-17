import { View, Text, Button, TextInput, TouchableOpacity, StyleSheet } from "react-native"
import React, { useState, useEffect } from "react";
import { Audio } from "expo-av"
import { sendNotesToBackend, sendFinalNotesToBackend } from "../ContactSync/backendService";

const TranscriberNote: React.FC <{contact}> = ({contact})=> {

    // Recording test   

    const [recording, setRecording] = useState(undefined);
    const [permissionResponse, requestPermission] = Audio.usePermissions();
    const [audioUri, setAudioUri] = useState(undefined);
    const [summary, setSummary] = useState<string>("");
    const [questions, setQuestions] = useState<string>("");

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

    // recording test end

    // audio test

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


    // ====================================================================================
    const generateSummary = async () => {
        try {
            // Make a network request to Flask server
            const response = await fetch('http://127.0.0.1:5100/generate-summary', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ text: transcribedText }), // Use the saved transcription
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
        <View style={{flex: 1, flexDirection: "column"}}>
             <Button
                title={recording ? 'Stop Recording' : 'Start Recording'}
                onPress={recording ? stopRecording : startRecording}/>

            <TextInput
                multiline
                value={transcribedText}
                placeholder="Transcription Placeholder"
                onChangeText={setTranscribedText}
                style={{ marginTop: 15, borderWidth: 1, padding: 10}}
            />
            <Button title="Save" onPress={()=> sendFinalNotesToBackend(transcribedText, contact.contactID)} />
            {/*Text Input for Notes*/}
            <TextInput
                style = {styles.notesInput}
                multiline
                numberOfLines={4}
                value={summary}
                onChangeText={(text) => setSummary(text)}
                placeholder="Please provide notes about ______"
            />
            <TextInput
                style = {styles.notesInput}
                multiline
                numberOfLines={4}
                value={questions}
                onChangeText={(text) => setQuestions(text)}
                placeholder="Click Generate Questions"
            />
            <TouchableOpacity style = {styles.generateButton} onPress={generateSummary}>
                <Text style={styles.buttonText}>Generate Summary</Text>
            </TouchableOpacity>
            <TouchableOpacity style = {styles.generateButton} onPress={generateQuestions}>
                <Text style={styles.buttonText}>Generate Questions</Text>
            </TouchableOpacity>
        </View>
    )
}
const styles = StyleSheet.create ({
    notesInput: {
        height: 100,
        borderColor: "gray",
        borderWidth: 1,
        borderRadius: 10,
        marginTop: 2,
        padding: 10,
        marginRight: 10
    },

    generateButton: {
        backgroundColor: "pink",
        padding: 10,
        borderRadius: 10,
        marginVertical: 10,
        alignItems: 'center',
    },

    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
    },
})
export {TranscriberNote};