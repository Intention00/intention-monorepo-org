import { StyleSheet } from "react-native"
import { styles as global } from "../Generic/global.style"

const styles = StyleSheet.create({
    test1: {
        backgroundColor: global.accentColor.color,
        color: global.inputBox.color,
        borderRadius: 10,
        padding: 10,
        marginBottom: 10,
        marginLeft:'2%',
        marginRight: '10%',        
        // width: 300
        
    },
    image: {
        width: 20, 
        height: 20,
        borderRadius: 25,
        marginRight: 10,
        marginLeft: 7,
        alignSelf:'flex-start'
    },


})

export {styles}