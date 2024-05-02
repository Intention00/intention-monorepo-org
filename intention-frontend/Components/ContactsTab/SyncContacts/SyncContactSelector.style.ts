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
        marginBottom: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },

    modalHeaderText: {
        textAlign: 'center',
        color: global.inputBox.color,
        fontSize: 24,
        marginRight: 45,
    },

    modalTextContainer: {
        paddingTop: 10,
        paddingLeft: 10,
        flex: 1,
        flexDirection: 'column',
        paddingRight: 10
    },

    contactsList: {
        marginTop: 15, 
        // maxHeight: 350
        maxHeight: '100%',
    },

    contactsListSelectText: {
        color: global.subText.color,
        fontSize: 16
    },

    selectButtons: {
        flexDirection: "row", 
        alignContent: 'center', 
        justifyContent: 'space-around', 
        marginBottom: 30, 
        paddingHorizontal: 20,
        // marginTop: 30,
        marginTop: '10%',
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
        marginRight: '5%'
    },

    saveButton:{
        marginBottom: '10%',
        alignItems: 'center'
    },

    saveText: {
        color: global.accentColor.color,
        fontSize: 16
    },

})

export {styles}