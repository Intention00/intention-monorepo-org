import { StyleSheet } from "react-native"
import { styles as global } from "../../Generic/global.style"
// Stylesheet for the SyncContactButton component
const styles = StyleSheet.create({
    // Adjustments for the button's position and appearance
    ButtonBox: {
        alignItems: 'flex-end',
        marginBottom: 50,
        marginRight: 50,
    },

    Button: {
        padding: 15,
        backgroundColor: global.inputBox.backgroundColor,
        borderRadius: 50,
    }
})

export {styles}