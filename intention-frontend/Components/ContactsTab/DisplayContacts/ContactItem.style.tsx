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
        marginLeft: 7
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
        color: global.accentColor.color,
        marginTop: 5
    },

    emoji: {
        fontSize: 18,
        marginRight: 0,
        color: global.subText.color
    },

    modalExit :{
        color: global.accentColor.color,
        fontSize: 30,
        paddingLeft: 0,
    },
    
    modalHeader: {
        paddingTop: 0,
        marginBottom: 30,
        flexDirection: 'row',
        alignItems: 'center'
    },
    
    modalHeaderText: {
        textAlign: 'center',
        color: '#fff',
        fontSize: 15 ,
        marginRight: 8,
        fontWeight: 'bold',
    },
})

export {styles}