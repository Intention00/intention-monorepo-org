import { StyleSheet } from "react-native"
import { styles as global } from "../../Generic/global.style"

const styles = StyleSheet.create({
    ButtonBox: {
        alignItems: 'flex-end',
        marginBottom: 30,
        marginRight: 15,
        marginTop: 10,
    },

    Button: {
        padding: 10,
        backgroundColor: global.inputBox.backgroundColor,
        borderRadius: 50,
    }


})

export {styles}