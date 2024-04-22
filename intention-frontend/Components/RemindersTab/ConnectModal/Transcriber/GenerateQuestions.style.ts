import { StyleSheet } from "react-native"
import { styles as global } from "../../../Generic/global.style"

const styles = StyleSheet.create ({
    generateButton:{
        marginVertical: 30,
        alignItems: 'center'
    },

    generateButtonText: {
        fontSize: 15,
        color: global.subText.color,
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
})

export {styles}