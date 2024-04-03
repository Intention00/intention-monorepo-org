import { StyleSheet } from "react-native"
import { styles as global } from "../../Generic/global.style"

const styles = StyleSheet.create ({
    notesInput: {
        maxHeight: 100,
        backgroundColor: global.inputBox.backgroundColor,
        color: global.inputBox.color,
        padding: 10,
        borderRadius: 10, 
        marginBottom: 10, 
        width: 250,
    },

    placeHolderTextColor: {
        color: global.inputBox.color
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
    },

    recordingButton: {
        backgroundColor: 'red'
    }, 

    notRecordingButton: {
        backgroundColor: 'lightblue'
    },

    questionContainer: {
        backgroundColor: '',
        flexDirection: 'row',
        width: "90%",
    },

    questionText: {
        backgroundColor: 'lightblue'
    },

    generateButton:{
        // backgroundColor: "lightpink",
        marginVertical: 30,
        alignItems: 'center'
    },

    generateButtonText: {
        fontSize: 15,
        color: global.subText.color,
    },

    copyButton:{
        backgroundColor: "lightgreen",
        
    },
})

export {styles}