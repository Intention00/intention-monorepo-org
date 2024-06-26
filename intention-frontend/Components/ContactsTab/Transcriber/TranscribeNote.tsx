import { View, Text, TextInput, TouchableOpacity, Modal, ActivityIndicator, Vibration } from "react-native";
import React, { useState } from "react";
import { Audio } from "expo-av";
import { sendNotesToBackend, sendFinalNotesToBackend, backendAddress, sendFavoriteQuestionToBackend } from "../../Generic/backendService";
import { Feather } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { styles } from "./TranscribeNote.style";
import { shareQuestion } from "./ShareQuestions/shareQuestion";
import { SummaryModal } from "./SummaryModal";

const TranscriberNote: React.FC <{contact}> = ({contact})=> {
    // Transcription Declarations
    const [recording, setRecording] = useState(undefined);
    const [permissionResponse, requestPermission] = Audio.usePermissions();
    const [audioUri, setAudioUri] = useState(undefined);
    const [summaryModalVisible, setSummaryModalVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const [summaryWait, setSummaryWait] = useState(false);
    const [saving, setSaving] = useState(false);
    const [loadingText, setLoadingText] = useState(false);

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
    const [questions, setQuestions] = useState<string[]>([]);

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
        }
        
    }
    
    return (
        <View style={{flex: 1, flexDirection: "column"}}>
            
            <View style={{flexDirection: 'row'}}>
                <TextInput
                    multiline
                    value={transcribedText}
                    placeholder={"Press once to record, twice to stop."}
                    placeholderTextColor={styles.placeHolderTextColor.color}
                    onChangeText={setTranscribedText}
                    style={styles.notesInput}
                />
                <View style={[styles.buttonBox, {marginLeft: 10}]}>
                    <TouchableOpacity
                        style={[styles.button, recording ? styles.recordingButton : styles.notRecordingButton]}
                        onPress={recording ? stopRecording : startRecording}>
                        {loadingText ? <ActivityIndicator size={"small"} color={"#FFF"}/> : <Feather name="mic" size={24} color={styles.icons.color} />}
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.button}
                        onPressOut={() => {Vibration.vibrate(130);}}
                        onPress={handleSaveClick}
                        disabled={saving}>
                            <Feather name="save" size={24} color={styles.icons.color} />
                    </TouchableOpacity>
                    
                </View>
            </View>

            <View style={{flexDirection: 'row'}}>
                <View style={styles.buttonBox}>
                    <TouchableOpacity
                        style={styles.button}
                        onPressOut={() => {
                            Vibration.vibrate(130);
                        }}
                        onPress={generateQuestions}>
                        {loading ? <ActivityIndicator size={"small"} color={"#FFF"}/> : <Ionicons name="create" size={24} color={styles.icons.color} />}
                        <Text style={styles.buttonText}>
                            {loading ? "Loading Questions" : "Generate Questions"}
                        </Text>
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

            <Modal visible={summaryModalVisible} transparent={true} onRequestClose={()=> {setSummaryModalVisible(false)}} animationType='fade'>
                <SummaryModal contact={contact} summaryWait={summaryWait} toggleModalVisibility={()=> setSummaryModalVisible(false)} />
            </Modal>
            
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

export { TranscriberNote };
