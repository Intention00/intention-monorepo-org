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
        height: 400,
        width: 370,
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
        width: 300, 
        height: 250
    },

    modalSummaryText: {
        textAlign: 'left',
        fontSize: 12,
        fontWeight: '500',
        color: global.inputBox.color,
    },

    modalHeader: {
        paddingLeft: 15,
        paddingTop: 15,
        marginRight: 10,
        marginBottom: 30,
        flexDirection: 'row',
    },

    modalHeaderText: {
        textAlign: 'center',
        color: global.inputBox.color,
        marginLeft: 90,
        fontSize: 24,
    },

    modalExit :{
        color: global.accentColor.color,
        // color: "#515151",
        fontSize: 30
    },
})

export {styles}