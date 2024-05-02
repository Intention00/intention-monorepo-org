import { StyleSheet } from "react-native"
import { styles as global } from "../../Generic/global.style"

// Styles for the NewReminderModal component
const styles = StyleSheet.create({
    centeredView: {
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        width: '100%',
    },

    modalView: {
        backgroundColor: 'rgba(10, 10, 10, 0.9)',
    },

    modalBox: {
        height: '47%',
        width: '94%',
        backgroundColor: global.background.backgroundColor,
        borderRadius: 30,
    },

    modalTextContainer: {
        paddingTop: 50,
        paddingLeft: 10,
        flex: 1,
        flexDirection: 'column',
    },

    modalTitleBox: {
        backgroundColor: global.inputBox.backgroundColor,
        borderRadius: 10,
        padding: 10,
        width: '86%' 
    },

    modalTitleText: {
        textAlign: 'center',
        fontSize: 16,
        fontWeight: '500',
        color: global.inputBox.color,
    },
})

export {styles}