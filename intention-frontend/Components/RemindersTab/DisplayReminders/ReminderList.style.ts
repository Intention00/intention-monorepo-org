import { StyleSheet } from "react-native";


const styles = StyleSheet.create({
    horizontalDivider: {
        height: 2,
        backgroundColor: '#282828',
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
        color: 'gray', 
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