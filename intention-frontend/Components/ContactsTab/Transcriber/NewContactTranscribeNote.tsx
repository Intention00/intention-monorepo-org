import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, Vibration } from "react-native";
import React, { useState, useEffect } from "react";
import { Audio } from "expo-av";
import { sendNotesToBackend, sendFinalNotesToBackend, getSummaryFromBackend, backendAddress, sendFavoriteQuestionToBackend } from "../../Generic/backendService";
import { Feather } from '@expo/vector-icons';
import * as Clipboard from 'expo-clipboard';
import { styles } from "./TranscribeNote.style";
import { shareQuestion } from "./ShareQuestions/shareQuestion";
import { SuggestionsModal } from "./SuggestionsModal";

const NewContactTranscriberNote: React.FC <{contact, exitModal}> = ({contact, exitModal})=> {
    // Transcription Declarations
    const [recording, setRecording] = useState(undefined);
    const [permissionResponse, requestPermission] = Audio.usePermissions();
    const [audioUri, setAudioUri] = useState(undefined);
    const [summaryModalVisible, setSummaryModalVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const [summaryWait, setSummaryWait] = useState(false);
    const [saving, setSaving] = useState(false);
    const [loadingText, setLoadingText] = useState(false);
    const [showInitialQuestions, setShowInitialQuestions] = useState(false); // Added state variable

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
        setLoadingText(true);

        await recording.stopAndUnloadAsync();
        await Audio.setAudioModeAsync({allowsRecordingIOS: false});
        const uri = recording.getURI();

        console.log('Recording stopped and stored at', uri);

        setAudioUri(uri);
        console.log("URI TEST VALUE AT END IS:", audioUri);

        const transcribedNotes = await sendNotesToBackend(uri);
        setLoadingText(false);
        if (transcribedNotes) {
            setTranscribedText(transcribedNotes);
        }
    }

    // testing text input button
    const [transcribedText, setTranscribedText] = useState('')

    // AI Generations
    const [summary, setSummary] = useState<string>("");
    const [questions, setQuestions] = useState<string[]>([]);

    console.log("Summary: ", summary)

    // Summarize Button Logic
    const generateSummary = async () => {
        try {
            const generatedSummary = await getSummaryFromBackend(contact.contactID);
            setSummary(generatedSummary);
        } catch (error) {
            console.error('Error generating summary:', error);
        }
    };

    const generateQuestions = async () => {
        setLoading(true);
        try {
            const response = await fetch(`${backendAddress}/api/generate-questions?contactID=${contact.contactID}&firstName=${contact.firstName}`, {
                method: 'GET',
            });
            const data = await response.json();
            const generatedQuestions = data.questions;
    
            if (Array.isArray(generatedQuestions)) {
                setQuestions(generatedQuestions);
                setLoading(false);
            } else {
                console.error('Generated questions is not an array:', generatedQuestions);
                setLoading(false);
            }
    
        } catch (error) {
            console.error('Error generating questions:', error);
            setLoading(false);
        }
    };
    
    const copyToClipboard = async (text) => {
        await Clipboard.setStringAsync(text);
    };
      
    const handleQuestionClick = (question) => {
        sendFavoriteQuestionToBackend(contact.contactID, question);
        shareQuestion(question);
    }

    const handleSaveClick = async () => {
        if (saving) {
            console.log('Waiting for previous save operation to complete.');
            return;
        }   
        try {
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
            setSaving(false);
            exitModal()
        }
        
    }

    useEffect(() => {
        const GenerateSummary = async () => {
            await generateSummary();
        }
        GenerateSummary();
    }, [])
    
    return (
        <View style={{flex: 1, flexDirection: "column"}}>    
            <View style={{flexDirection: 'row', marginBottom: '15%'}}>
                <TextInput
                    multiline
                    value={transcribedText}
                    placeholder={"Press once to record, twice to stop.\n\nUse the info box on the right to see some suggested questions."}
                    placeholderTextColor={styles.placeHolderTextColor.color}
                    onChangeText={setTranscribedText}
                    style={styles.notesInput}
                />
                <View style={[styles.buttonBox, {marginLeft: 10}]}>

                    <View>
                        <SuggestionsModal/>
                    </View>

                    <TouchableOpacity
                        style={[styles.button, recording ? styles.recordingButton : styles.notRecordingButton]}
                        onPress={recording ? stopRecording : startRecording}>
                        {loadingText ? <ActivityIndicator size={"small"} color={"#FFF"}/> : <Feather name="mic" size={24} color={styles.icons.color} />}
                    </TouchableOpacity>
                    
                </View>
            </View>

            <View style={{marginBottom: '5%'}}>
                <Text style={styles.onBoardingText}>Click Save to Finish Contact Setup</Text>
            </View>
            

            <TouchableOpacity
                style={styles.button}
                onPressOut={() => {Vibration.vibrate(130);}}
                onPress={handleSaveClick}
                disabled={saving}>
                    <Feather name="save" size={24} color={styles.icons.color} />
                    <Text>Save</Text>
            </TouchableOpacity>
            
        </View>
    )
}

export {NewContactTranscriberNote};
