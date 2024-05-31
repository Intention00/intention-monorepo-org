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
        backgroundColor: 'rgba(10, 10, 10, 0.6)',
    },

    modalBox: {
        width: '94%',
        height: '79%',
        backgroundColor: global.background.backgroundColor,
        borderRadius: 30,
    },

    modalExit :{
        color: global.accentColor.color,
        fontSize: 30,
        paddingLeft: 15,
    },

    modalHeader: {
        paddingTop: 15,
        marginBottom: 30,
        flexDirection: 'row',
        alignItems: 'center',
    },

    modalHeaderText: {
        textAlign: 'center',
        color: global.inputBox.backgroundColor,
        fontSize: 24,
        fontWeight: 'bold',
        marginRight: 5,
    },

    scoreText: {
        color: global.accentColor.color,
        marginLeft: 0,
        marginRight: 30,
        fontSize: 24,
    },

    modalTextContainer: {
        paddingTop: 10,
        paddingLeft: 10,
        flex: 1,
        flexDirection: 'column',
        paddingRight: 10
    },

    selectButtons: {
        flexDirection: "row", 
        alignContent: 'center', 
        justifyContent: 'space-around', 
        paddingBottom: 30, 
        paddingHorizontal: 20,
        marginTop: 30,
    },

    contactsListSelectText: {
        color: global.inputBox.color,
        fontSize: 16,
        alignSelf: 'center',
        fontWeight: '500',
    },

    modalNameBox: {
        backgroundColor: global.accentColor.color,
        borderRadius: 10,
        padding: 10,
        width: '86%',
    },

    modalNameText: {
        textAlign: 'center',
        fontSize: 20,
        fontWeight: '500',
        color: global.inputBox.color,
    },

})

export {styles}