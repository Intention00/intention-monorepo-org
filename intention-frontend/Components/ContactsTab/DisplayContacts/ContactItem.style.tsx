import { StyleSheet } from "react-native"

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
        fontSize: 18,
        fontWeight: 'bold',
    },

    phoneText: {
        fontSize: 16
    }

})

export {styles}