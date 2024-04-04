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
        flexDirection: 'row',
        width: "90%",
    },

    questionTextBox: {
        // backgroundColor: global.inputBox.backgroundColor,
        borderRadius: 10,
        padding: 5
    },

    questionText: {
        color: global.bodyText.color,
    },

    horizontalDivider: {
        height: 1,
        backgroundColor: '#282828',
        borderRadius: 2,
        marginTop: 4,
        marginBottom: 4
    },

    generateButton:{
        marginVertical: 30,
        alignItems: 'center'
    },

    generateButtonText: {
        fontSize: 15,
        color: global.subText.color,
    },

    // copyButton:{
    //     backgroundColor: "lightgreen",
        
    // },
})

export {styles}