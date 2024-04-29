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
        height: 600,
        width: 370,
        backgroundColor: global.background.backgroundColor,
        borderRadius: 30,
    },

    modalExit :{
        // color: global.inputBox.color,
        color: "#515151",
        fontSize: 30
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
        marginLeft: 65,
        fontSize: 24,
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
        width: 300
        
    },

    modalText: {
        textAlign: 'center',
        fontSize: 16,
        fontWeight: '500',
        color: global.inputBox.color,
    },

})

export {styles}