import { StyleSheet } from "react-native"

// Styles for the SyncContactSelector component
const styles = StyleSheet.create({
    centeredView: {
        justifyContent: 'center',
        alignItems: 'center',
        height: '105%',
        width: '100%',
    },

    modalView: {
        backgroundColor: 'rgba(10, 10, 10, 0.5)',
    },

    modalBox: {
        height: 600,
        width: 350,
        backgroundColor: 'white',
        borderRadius: 40,
    },

    modalTextContainer: {
        paddingTop: 50,
        paddingLeft: 10,
        flex: 1,
        flexDirection: 'column',
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
    modalExitButtons: {
        flexDirection: "row", 
        alignContent: 'center', 
        justifyContent: 'space-around', 
        paddingBottom: 30, 
        paddingHorizontal: 50
    }
})

export {styles}