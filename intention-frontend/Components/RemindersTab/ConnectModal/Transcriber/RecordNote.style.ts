import { StyleSheet } from "react-native"
import { styles as global } from "../../../Generic/global.style"

const styles = StyleSheet.create ({
    notesInput: {
        maxHeight: 100,
        backgroundColor: global.inputBox.backgroundColor,
        color: global.inputBox.color,
        padding: 10,
        borderRadius: 10, 
        marginBottom: 10, 
        width: '70%',
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
        backgroundColor: global.accentColor.color
    },

    saveText: {
        color: global.accentColor.color,
        fontSize: 16
    },

    exitButtons: {
        flexDirection: "row", 
        alignContent: 'center', 
        justifyContent: 'space-around', 
        paddingBottom: 30, 
        paddingHorizontal: 20,
        marginTop: 80,
    },

    exitText: {
        color: global.bodyText.color,
        fontSize: 16
    },
})

export {styles}