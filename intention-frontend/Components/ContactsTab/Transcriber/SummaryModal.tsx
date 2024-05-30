import { View, Text, ScrollView, ActivityIndicator } from "react-native"
import { styles } from "./SummaryModal.style"
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { getSummaryFromBackend } from "../../Generic/backendService";
import { useState, useEffect } from "react";

const SummaryModal: React.FC <{contact, toggleModalVisibility, summaryWait}> = ({contact, toggleModalVisibility, summaryWait})=> {

    const [summary, setSummary] = useState(undefined);

    useEffect(()=> {
        (async ()=> {
            try {
                if (!summaryWait) {
                    const tempSummary = await getSummaryFromBackend(contact.contactID);
                    console.log(`Summary is: ${JSON.stringify(tempSummary)}`)
                    setSummary(tempSummary);
                }

            }
            catch (err) {
                console.error(err);
            }
            
        })()
    }, [summaryWait]);

    const displaySummary = ()=> {
        if (summary === undefined) {
            return (false)
        }
        else if (summary === "" || summary === null) {
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
                    <View style={{flex: 1}}>
                        <Text style={styles.modalHeaderText}>Summary</Text>
                    </View>
                </View>
                
                <View style={styles.modalTextContainer}>

                    <View style={{alignItems: 'center', marginBottom: 50}}>
                            <View style={styles.modalSummaryBox}>
                                {displaySummary() ? 
                                    <ScrollView>
                                        {displaySummary()}
                                    </ScrollView> : 
                                    <ActivityIndicator size={"large"}/>}
                            </View>
                    </View>
                </View>

            </View>
        </View>
    )
}

export {SummaryModal}