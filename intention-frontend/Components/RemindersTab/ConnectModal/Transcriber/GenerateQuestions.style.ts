import { StyleSheet } from "react-native"
import { styles as global } from "../../../Generic/global.style"

const styles = StyleSheet.create ({
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
        color: global.bodyText.color,
    },

    horizontalDivider: {
        height: 1,
        backgroundColor: '#282828',
        borderRadius: 2,
        marginTop: 4,
        marginBottom: 4
    },

    button: {
        backgroundColor: global.accentColor.color,
        padding: 6,
        borderRadius: 10,
        alignItems: 'center',
    },

    buttonText: {
      color: 'rgb(25, 25, 25)', 
      fontSize: 12,
      fontWeight: 'bold',
    },

    buttonBox: {
        marginTop: 50,
        flex: 1, 
        paddingHorizontal: 10, 
        justifyContent: 'center', 
        paddingBottom: 20,
    },
})

export {styles}