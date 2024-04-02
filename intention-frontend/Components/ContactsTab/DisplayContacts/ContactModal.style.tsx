import { StyleSheet } from "react-native"

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
        // justifyContent: 'space-between',
    },

    modalText: {
        textAlign: 'left',
        marginBottom: 20,
        fontSize: 16,
        fontWeight: '500'
    },
    image: {
        width: 120, 
        height: 120,
        borderRadius: 75,
        marginRight: 10,
    },
})

export {styles}