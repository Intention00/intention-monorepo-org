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
        paddingTop: 10,
        paddingLeft: 10,
        flex: 1,
        flexDirection: 'column',
        paddingRight: 10,
    },

    modalSummaryBox: {
        backgroundColor: global.inputBox.backgroundColor,
        borderRadius: 10,
        padding: 10,
        width: '86%',
        height: '97%'
    },

    modalSummaryText: {
        textAlign: 'left',
        fontSize: 12,
        fontWeight: '500',
        color: global.inputBox.color,
    },

    modalHeader: {
        paddingTop: 15,
        marginBottom: 30,
        flexDirection: 'row',
        alignItems: 'center',
    },

    modalHeaderText: {
        textAlign: 'center',
        color: global.inputBox.color,
        fontSize: 24,
        marginRight: 45,
    },

    modalExit :{
        color: global.accentColor.color,
        // color: "#515151",
        fontSize: 30,
        paddingLeft: 15,
    },
})

export {styles}