import { StyleSheet } from "react-native"
import { styles as global } from "../../Generic/global.style"

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
        alignItems: 'center'
    },

    modalHeaderText: {
        textAlign: 'center',
        color: global.inputBox.backgroundColor,
        fontSize: 24,
        fontWeight: 'bold',
        marginRight: 45
    },

    modalTextContainer: {
        paddingTop: 10,
        paddingLeft: 10,
        paddingRight: 10,
        flex: 1,
        flexDirection: 'column',
    },

    modalNameBox: {
        backgroundColor: global.inputBox.backgroundColor,
        borderRadius: 10,
        padding: 10,
        width: '86%',
    },

    modalText: {
        textAlign: 'center',
        fontSize: 16,
        fontWeight: '500',
        color: global.inputBox.color,
    },

})

export {styles}