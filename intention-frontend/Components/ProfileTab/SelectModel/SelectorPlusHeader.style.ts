import { StyleSheet } from "react-native";
import { styles as global } from "../../Generic/global.style";

const styles = StyleSheet.create({
    selectorText: {
        color: global.bodyText.color, 
        textAlign: 'center',
        marginBottom: 10
    },

    settingsText: {
        color: global.accentColor.color,
        marginBottom: 20,
        fontWeight: 'bold',
        fontSize: 16,
    }

})

export {styles}