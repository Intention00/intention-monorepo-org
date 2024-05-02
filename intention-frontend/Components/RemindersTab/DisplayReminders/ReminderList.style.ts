import { StyleSheet } from "react-native";
import { styles as global } from "../../Generic/global.style";


const styles = StyleSheet.create({
    horizontalDivider: {
        height: 2,
        backgroundColor: global.horizontalDivider.color,
        borderRadius: 2,
        marginBottom: 10,
    },

    reminderItem: {
        marginLeft: 100,
    },

    hourBox: {
        marginLeft: '3%',
        // marginLeft: 10,
        width: '10%',
        // width: 50,
    }, 

    hourText: {
        color: global.inputBox.color, 
        textAlign: 'right',
    },

    reminderBox: {
        alignItems: 'center',
    },

    reminderList: {
        maxHeight: 400,
    }

})

export {styles}