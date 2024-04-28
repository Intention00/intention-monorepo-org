import { View, Text } from "react-native"
import { styles } from "./SummaryModal.style"
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { getSummaryFromBackend } from "../../Generic/backendService";
import { useState, useEffect } from "react";

const SummaryModal: React.FC <{contact, toggleModalVisibility}> = ({contact, toggleModalVisibility})=> {

    const [summary, setSummary] = useState(undefined);

    useEffect(()=> {
        (async ()=> {
            try {
                const tempSummary = await getSummaryFromBackend(contact.contactID);
                setSummary(tempSummary);

            }
            catch (err) {
                console.error(err);
            }
            
        })()
    }, []);

    const displaySummary = ()=> {
        if (summary === undefined) {
            return (<Text style={styles.modalSummaryText}>Loading</Text>)
        }
        else if (summary === "") {
            return (<Text style={styles.modalSummaryText}>Please add some notes.</Text>)
        }
        else {
            return (<Text style={styles.modalSummaryText}>{summary}</Text>)
        }
    }

    return (
        <View style={[styles.centeredView, styles.modalView]}>
            <View style={[styles.modalBox]}>
                <View style={styles.modalHeader}>
                    <MaterialCommunityIcons style={styles.modalExit} name="window-close" onPress={toggleModalVisibility}/>
                    <Text style={styles.modalHeaderText}>Summary</Text>
                </View>
                
                <View style={styles.modalTextContainer}>

                    <View style={{alignItems: 'center', marginBottom: 50}}>
                            <View style={styles.modalSummaryBox}>
                                {/* {(summary === undefined) ? <Text style={{color: 'white'}}>Loading</Text>
                                : <Text style={styles.modalSummaryText}>{summary}</Text>} */}
                                {displaySummary()}
                            </View>
                    </View>
                </View>

            </View>
        </View>
    )
}

export {SummaryModal}