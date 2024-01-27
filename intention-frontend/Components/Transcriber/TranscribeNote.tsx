import { View, Button } from "react-native"
import { useState, useEffect } from "react";
import { Audio } from "expo-av"

const TranscriberNote: React.FC = ()=> {

    // Recording test

    const [recording, setRecording] = useState(undefined);
    const [permissionResponse, requestPermission] = Audio.usePermissions();
    const [audioUri, setAudioUri] = useState(undefined);

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
            const { recording } = await Audio.Recording.createAsync( Audio.RecordingOptionsPresets.HIGH_QUALITY);
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

    
    return (
        <View>
             <Button
                title={recording ? 'Stop Recording' : 'Start Recording'}
                onPress={recording ? stopRecording : startRecording}/>
            <Button title="Play Sound" onPress={playSound} />
        </View>
    )
}

export default TranscriberNote;