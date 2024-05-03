import { View, Text, TextInput, TouchableOpacity, Modal, Button } from "react-native"
import React, { useState } from "react";
import { Audio } from "expo-av"
import { sendNotesToBackend, sendFinalNotesToBackend } from "../../Generic/backendService";
import { Feather } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { backendAddress } from "../../Generic/backendService";
import * as Clipboard from 'expo-clipboard';
import { styles } from "./TranscribeNote.style";
import { shareQuestion } from "./ShareQuestions/shareQuestion";
import { SummaryModal } from "./SummaryModal";

const TranscriberNote: React.FC <{contact}> = ({contact})=> {
    // Transcription Declarations
    const [recording, setRecording] = useState(undefined);
    const [permissionResponse, requestPermission] = Audio.usePermissions();
    const [audioUri, setAudioUri] = useState(undefined);
    const [summaryModalVisible, setSummaryModalVisible] = useState(false);
    const [summaryWait, setSummaryWait] = useState(false);
    const [saving, setSaving] = useState(false);

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

    // testing text input button
    const [transcribedText, setTranscribedText] = useState('')


    // ==============================================================================================
    // AI Generations
    // ==============================================================================================
    
    // AI Generating Declarations
    const [summary, setSummary] = useState<string>("");
    const [questions, setQuestions] = useState<string[]>([]);

    
    // Summarize Button Logic
    const generateSummary = async () => {
        try {
            // Make a network request to Flask server
            const response = await fetch(`${backendAddress}/generate-summary`, {
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

    const generateQuestions = async () => {
        try {
            // Make a network request to Flask server
            const response = await fetch(`${backendAddress}/api/generate-questions?contactID=${contact.contactID}
            &firstName=${contact.firstName}`, {
                method: 'GET',
            });
    
            // Handle the response
            const data = await response.json();
            const generatedQuestions = data.questions;
    
            // Ensure generatedQuestions is an array before setting state
            if (Array.isArray(generatedQuestions)) {
                // Update the state with the generated questions
                setQuestions(generatedQuestions);
            } else {
                console.error('Generated questions is not an array:', generatedQuestions);
            }
    
        } catch (error) {
            console.error('Error generating questions:', error);
        }
    };
    
    const copyToClipboard = async (text) => {
        await Clipboard.setStringAsync(text);
      };
      
    const handleQuestionClick = (question) => {
        // Alert.alert('Question Copied', '', 
        //     [{text: 'Ok', onPress: ()=> console.log('Ok pressed.')}]);
        // copyToClipboard(question);
        shareQuestion(question);
    }

    const handleSaveClick = async () => {
        // Check if already saving
        if (saving) {
            console.log('Waiting for previous save operation to complete.');
            return;
        }   
        try {
            // Set saving status to true
            setSaving(true);
            setSummaryWait(true);
            await sendFinalNotesToBackend(transcribedText, contact.contactID);
            setSummaryWait(false);
            console.log('Note saved successfully.');
        }
        catch (error) {
            console.error('Error saving note:', error);
        } 
        finally {
            // Reset saving status to false after save operation completes
            setSaving(false);
        }
        
    }
    
    return (
        // Modal Container
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
                    <TouchableOpacity
                        style={styles.button}
                        onPress={handleSaveClick}
                        disabled={saving}>
                        <Feather name="save" size={24} color={styles.icons.color} />
                    </TouchableOpacity>
                </View>
            </View>

            {/* Summary Section*/}
            <View style={{flexDirection: 'row'}}>

                <View style={styles.buttonBox}>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={generateQuestions}>
                        <Ionicons name="create" size={24} color={styles.icons.color} />
                        <Text style={styles.buttonText}>Generate Questions</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.buttonBox}>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={()=> setSummaryModalVisible(true)}>
                        <MaterialIcons name="summarize" size={24} color={styles.icons.color} />
                        <Text style={styles.buttonText}>Summary</Text>
                    </TouchableOpacity>
                </View>
            </View>

            {/* Summary modal */}
            {/* <Button title="Summary" onPress={()=> setSummaryModalVisible(true)}></Button> */}

            <Modal visible={summaryModalVisible} transparent={true} onRequestClose={()=> {setSummaryModalVisible(false)}} animationType='fade'>
                <SummaryModal contact={contact} summaryWait={summaryWait} toggleModalVisibility={()=> setSummaryModalVisible(false)}></SummaryModal>
            </Modal>
            
            {/* Questions Section */}
            <View style={{ flexDirection: 'column' }}>
                {questions.map((question, index) => (
                    <View key={index}>
                        <View style={styles.questionContainer}>
                            <TouchableOpacity style={styles.questionTextBox} onPress={()=> handleQuestionClick(question)}>
                                <Text style={styles.questionText}>{question}</Text>
                            </TouchableOpacity>
                            
                        </View>

                        <View style={styles.horizontalDivider}></View>
                    </View>
                ))}

            </View>

        </View>
    )
}

export {TranscriberNote};