import { View, Text, TouchableOpacity } from "react-native"
import { styles } from "./YesConnectedModal.style"
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { RecordNote } from "./Transcriber/RecordNote";


const YesConnectedModal: React.FC <{contact, toggleModalVisibility, toggleYesModalVisability}> = ({contact, toggleModalVisibility, toggleYesModalVisability})=> {

    return (
        <View style={[styles.centeredView, styles.modalView]}>
            <View style={[styles.modalBox]}>
                
                <View style={styles.modalTextContainer}>

                    <View style={{alignItems: 'center', marginBottom: 50, marginRight: 10}}>
                            <View style={styles.modalTitleBox}>
                                <Text style={styles.modalTitleText}>What did you talk about?</Text>
                            </View>
                    </View>

                    <RecordNote contact={contact} modalToggle={toggleModalVisibility} yesModalToggle={toggleYesModalVisability}></RecordNote>
                </View>

            </View>
        </View>
    )
}

export {YesConnectedModal}