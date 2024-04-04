import { StyleSheet } from "react-native"
import { styles as global } from "../../Generic/global.style"

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 5
    },

    image: {
        width: 50, 
        height: 50,
        borderRadius: 25,
        marginRight: 10,
    },

    containerText: {
        flex: 1,
    },

    nameText: {
        fontSize: 14,
        color: global.bodyText.color
    },

    phoneText: {
        fontSize: 10,
        color: global.subText.color
    }

})

export {styles}