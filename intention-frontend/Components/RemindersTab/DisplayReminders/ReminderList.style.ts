import { StyleSheet } from "react-native";
import { styles as global } from "../../Generic/global.style";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";


const styles = StyleSheet.create({
    horizontalDivider: {
        height: 2,
        backgroundColor: global.horizontalDivider.color,
        borderRadius: 2,
        marginBottom: 10,
    },

    reminderItem: {
        marginLeft: '8%',
    },

    hourBox: {
        marginLeft: '3%',
        // marginLeft: 10,
        width: '20%',
        // width: 50,
        flexDirection: 'row'
    }, 

    hourText: {
        color: '#FFF', 
        textAlign: 'right',
        // fontSize: 16,
        fontSize: RFPercentage(1.5),
        fontWeight:'400',
    },

    reminderBox: {
        alignItems: 'center',
    },

    reminderList: {
        maxHeight: 400,
    }

})

export {styles}