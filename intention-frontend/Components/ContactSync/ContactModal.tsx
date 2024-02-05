import { View, Text, Button, StyleSheet } from "react-native"
import TranscriberNote from '../Transcriber/TranscribeNote'
import AI_Generations from "../AI_Generations/AI_Generations"

const ContactModal: React.FC <{contact, toggleModalVisibility}> = ({contact, toggleModalVisibility})=> {


    return (
        <View style={[styles.centeredView, styles.modalView]}>
            <View style={[styles.modalBox]}>
                <View style={styles.modalTextContainer}>
                    <Text style={[styles.modalText, {textAlign: 'center', paddingBottom: 40}]}>Contact details:</Text>
                    <Text style={styles.modalText}>Name: {`${contact.firstName} ${contact.lastName}`}</Text>
                    <Text style={styles.modalText}>Phone: {contact.number}</Text>

                    <TranscriberNote contact={contact}></TranscriberNote>
                    {/* <AI_Generations></AI_Generations> */}
                    
                </View>

                <Button title="Edit Name"></Button>
                <Button title="Close" onPress={toggleModalVisibility}></Button>
                
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    centeredView: {
        // flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        width: '100%',
    },

    modalView: {
        backgroundColor: 'rgba(10, 10, 10, 0.5)',
    },

    modalBox: {
        height: 600,
        width: 350,
        backgroundColor: 'white',
        borderRadius: 40,
    },

    modalTextContainer: {
        paddingTop: 50,
        paddingLeft: 10,
        flex: 1,
        flexDirection: 'column',
        // justifyContent: 'space-between',
    },

    modalText: {
        textAlign: 'left',
        marginBottom: 20,
        fontSize: 16,
        fontWeight: '500'
    }
})

export default ContactModal;