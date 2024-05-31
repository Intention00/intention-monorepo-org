import { StyleSheet } from "react-native"
import { styles as global } from "../../../Generic/global.style"
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

const styles = StyleSheet.create ({
    notesInput: {
        maxHeight: 100,
        maxWidth: '72%',
        width: '72%',
        backgroundColor: global.inputBox.backgroundColor,
        color: global.inputBox.color,
        padding: 10,
        borderRadius: 10, 
        marginBottom: 10,
        fontSize: RFPercentage(1.5),
    },

    placeHolderTextColor: {
        color: global.inputBox.color
    },

    button: {
        backgroundColor: global.accentColor.color,
        padding: 12,
        borderRadius: 10,
        marginTop: 5,
        marginBottom: 5,
        alignItems: 'center',
    },

    buttonText: {
      color: global.buttonText.color, 
      fontSize: 12,
      fontWeight: 'bold',
    },

    buttonBox: {
        flex: 1, 
        padding: 5, 
        justifyContent: 'center', 
        paddingBottom: 12,
        marginHorizontal: 10,
    },

    recordingButton: {
        backgroundColor: 'red'
    }, 

    notRecordingButton: {
        backgroundColor: global.accentColor.color
    },

    saveText: {
        color: global.inputBox.color,
        fontSize: 16,
        alignSelf: 'center',
        fontWeight: '500',
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

    icons: {
        color: global.buttonText.color
    },

})

export {styles}