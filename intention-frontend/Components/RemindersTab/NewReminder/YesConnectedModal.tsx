import { View, Text } from "react-native"
import { styles } from "./YesConnectedModal.style"
import { MaterialCommunityIcons } from '@expo/vector-icons';


const YesConnectedModal: React.FC <{toggleModalVisibility}> = ({toggleModalVisibility})=> {

    return (
        <View style={[styles.centeredView, styles.modalView]}>
            <View style={[styles.modalBox]}>
                <View style={styles.modalHeader}>
                    <MaterialCommunityIcons style={styles.modalExit} name="window-close" onPress={toggleModalVisibility}/>
                </View>

                <View style={styles.modalTextContainer}>

                    <View style={{alignItems: 'center', marginBottom: 30, marginRight: 10}}>
                            <View style={styles.modalTitleBox}>
                                <Text style={styles.modalTitleText}>What did you talk about?</Text>
                            </View>
                    </View>
                </View>

            </View>
        </View>
    )
}

export {YesConnectedModal}