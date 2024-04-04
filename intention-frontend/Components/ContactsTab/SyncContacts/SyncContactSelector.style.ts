import { StyleSheet } from "react-native"
import { styles as global } from "../../Generic/global.style"

// Styles for the SyncContactSelector component
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
        height: 600,
        width: 370,
        backgroundColor: global.background.backgroundColor,
        borderRadius: 30,
    },

    modalExit :{
        color: global.accentColor.color,
        // color: "#515151",
        fontSize: 30
    },

    modalHeader: {
        paddingLeft: 15,
        paddingTop: 15,
        marginRight: 10,
        marginBottom: 20,
        flexDirection: 'row',
    },

    modalHeaderText: {
        textAlign: 'center',
        color: global.inputBox.color,
        marginLeft: 70,
        fontSize: 24,
    },

    modalTextContainer: {
        paddingTop: 10,
        paddingLeft: 10,
        flex: 1,
        flexDirection: 'column',
    },

    contactsList: {
        marginTop: 15, 
        maxHeight: 350
    },

    contactsListSelectButton:{
        marginVertical: 30,
        // alignItems: 'flex-end',
        // marginRight: 50
    },

    contactsListSelectText: {
        color: global.subText.color,
        fontSize: 16
    },

    selectButtons: {
        flexDirection: "row", 
        alignContent: 'center', 
        justifyContent: 'space-around', 
        paddingBottom: 30, 
        paddingHorizontal: 20
    },

    contactCheckBoxRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        width: '100%',
    },
    checkbox: {
        alignSelf: 'center',
        marginLeft: 'auto',
    },

    saveButton:{
        marginBottom: 40,
        alignItems: 'center'
    },

    saveText: {
        color: global.accentColor.color,
        fontSize: 16
    },

    // modalExitButtons: {
    //     flexDirection: "row", 
    //     alignContent: 'center', 
    //     justifyContent: 'space-around', 
    //     paddingBottom: 30, 
    //     paddingHorizontal: 50
    // }
})

export {styles}