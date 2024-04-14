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
        marginLeft: 90,
        fontSize: 24,
    },

    modalTextContainer: {
        paddingTop: 10,
        paddingLeft: 10,
        flex: 1,
        flexDirection: 'column',
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
        color: global.subText.color,
        fontSize: 16
    },

    saveButton:{
        marginBottom: 40,
        alignItems: 'center'
    },

    saveText: {
        color: global.accentColor.color,
        fontSize: 16
    },

})

export {styles}