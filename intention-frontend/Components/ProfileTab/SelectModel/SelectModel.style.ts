import { StyleSheet } from "react-native";
import { styles as global } from "../../Generic/global.style";


const styles = StyleSheet.create({
    selectorBox: {
        justifyContent: 'center',
        alignContent: 'center',
    },

    selector: {
        alignSelf: 'center',
        backgroundColor: global.inputBox.backgroundColor,
        borderRadius: 10,
        width: '100%',

    },

    selectorItem: {
        color: global.inputBox.color,
    }

})

export {styles}