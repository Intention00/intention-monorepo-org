import { StyleSheet } from "react-native"
import { styles as global } from "../../Generic/global.style"
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

    QuestionText: {
        color: global.inputBox.color,
        fontSize: RFPercentage(2),

        textAlign: 'center',
        padding: 5,
    },

    button: {
        backgroundColor: global.accentColor.color,
        padding: 6,
        borderRadius: 10,
        marginTop: 10,
        alignItems: 'center',
    },

    infoButton: {
        backgroundColor: global.accentColor.color,
        padding: 8,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 8,
        maxWidth: 50,
        maxHeight: 50,
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
        paddingBottom: 20,
    },
    textBox: {
        borderWidth: 1,
        borderColor: global.accentColor.color,
        padding: 6,
        borderRadius: 10,
        marginVertical: 10,
      },

    recordingButton: {
        backgroundColor: 'red'
    }, 

    notRecordingButton: {
        backgroundColor: global.accentColor.color
    },

    questionContainer: {
        flexDirection: 'row',
        width: "100%",
    },

    questionTextBox: {
        // backgroundColor: global.inputBox.backgroundColor,
        borderRadius: 10,
        padding: 5
    },

    questionText: {
        color: global.inputBox.backgroundColor,
    },

    horizontalDivider: {
        height: 1,
        backgroundColor: global.horizontalDivider.color,
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

    icons: {
        color: global.buttonText.color
    },

    onBoardingText: {
        color: global.subText.color,
        fontSize: RFPercentage(1.75),
        textAlign: 'center',
        fontWeight: 'bold'
    }

})

export {styles}