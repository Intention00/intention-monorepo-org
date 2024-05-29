import { StyleSheet } from "react-native";
import { styles as global } from "../../Generic/global.style";


const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        
    },
    modalView: {
        backgroundColor: global.background.backgroundColor,
        borderRadius: 10,
        padding: 20,
        alignItems: 'center',
        shadowOpacity: 0.25,
        shadowRadius: 4,
        
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
        fontWeight: 'bold',
        color: global.bodyText.color,
        
    },
    button: {
        backgroundColor: '#2196F3',
        padding: 10,
        borderRadius: 5,
        marginTop: 10,
    },
    buttonText: {
        color: global.bodyText.color,
        fontWeight: 'bold',
    },
});

export { styles };