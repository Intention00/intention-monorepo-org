import { StyleSheet } from "react-native";
import { styles as global } from "../../Generic/global.style";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";


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
        color: global.bodyText.color,
        fontSize: RFPercentage(1.5),
    },
    modalTextHeader: {
        marginBottom: 15,
        textAlign: 'center',
        fontWeight: 'bold',
        color: global.bodyText.color,
        fontSize: RFPercentage(2),
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