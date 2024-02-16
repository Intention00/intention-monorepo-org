// import React, { useState } from 'react';
// import { View, Button, TextInput, Modal } from 'react-native';
// import * as TranscriberNote from '../Transcriber/TranscribeNote';
// import * as AI_Generations from '../AI_Generations/AI_Generations';
// import { Audio } from "expo-av"

// const TranscribeAndProcess: React.FC = ()=> {
//     const [recording, setRecording] = useState(undefined);
//     const [permissionResponse, requestPermission] = Audio.usePermissions();
//     const [audioUri, setAudioUri] = useState(undefined);

//     return (
//         <View style={{flex: 1, flexDirection: "column"}}>
//              <Button
//                 title={TranscriberNote.recording ? 'Stop Recording' : 'Start Recording'}
//                 onPress={recording ? stopRecording : startRecording}/>

//             <TextInput
//                 multiline
//                 value={transcribedText}
//                 placeholder="Transcription Placeholder"
//                 onChangeText={setTranscribedText}
//                 style={{ marginTop: 15, borderWidth: 1, padding: 10}}
//             />
            
//             <Button title="Save" onPress={()=> sendFinalNotesToBackend(transcribedText, contact.contactID)} />
//             {/* <Button title="Play Sound" onPress={playSound} /> */}
//         </View>
//     )
// }

// export {TranscribeAndProcess}