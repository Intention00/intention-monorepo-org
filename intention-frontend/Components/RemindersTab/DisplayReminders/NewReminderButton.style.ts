import { StyleSheet } from "react-native"
import { styles as global } from "../../Generic/global.style"

const styles = StyleSheet.create({
    ButtonBox: {
        alignItems: 'flex-end',
        marginBottom: 50,
        marginRight: 50,
    },

    Button: {
        padding: 10,
        backgroundColor: global.inputBox.backgroundColor,
        borderRadius: 50,
    }


})

export {styles}