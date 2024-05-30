import { View, SafeAreaView, FlatList, TouchableHighlight, Text, Modal } from "react-native";
import { ReminderItem } from "./ReminderItem";
import { useState } from "react";
import { styles } from "./ReminderList.style";
import { ConnectModal } from "../ConnectModal/ConnectModal";

const ReminderList: React.FC <{reminders: any[]}> = ({reminders})=> {
    const [selectedReminder, setSelectedReminder] = useState(undefined);
    // State to manage the visibility of the modal for selecting contacts to sync
    const [modalVisible, setModalVisible] = useState(false);

    const onReminderClick = (reminder)=> {
        setSelectedReminder(reminder);
        setModalVisible(true)
    };

    const renderHourlyReminders = (hourlyReminders) => {
        if (!Array.isArray(hourlyReminders)) {
            return null; // or any fallback UI if needed
        }
    
        return (
            <View>
                {hourlyReminders.map((reminder, index) => (
                    <TouchableHighlight 
                        key={index}
                        style={styles.reminderItem}
                        underlayColor={'rgba(10, 10, 10, 0.25)'} 
                        onPress={()=> {onReminderClick(reminder)}}>
                        <ReminderItem reminder={reminder}></ReminderItem>
                    </TouchableHighlight>
                ))}
            </View>
        );
    };
    

    // Helper function to render each hour and its associated reminders
    const renderHourlyBoxes = () => {
        const hours = Object.keys(reminders);
        return (
            <View>
                <View style={styles.horizontalDivider}></View> 
                <FlatList
                    data={hours}
                    style={styles.reminderList} 
                    renderItem={({item})=> (
                        <View>
                            <View style={{flexDirection: 'row'}}>
                                <View style={styles.hourBox}>
                                    <Text style={styles.hourText}>
                                        {(Number(item) > 12 ? Number(item) - 12: Number(item))}
                                    </Text>

                                    <Text style={styles.hourText}>
                                        {(Number(item) < 12 ? ' AM' : ' PM')}
                                    </Text>

                                </View>
                                <View style={styles.reminderBox}>
                                    {renderHourlyReminders(reminders[item])}
                                    
                                </View>   
                            </View>
                            <View style={styles.horizontalDivider}></View> 
                        </View>
                        
                    )}
                /> 
            </View>
        );
    };

    return (
        <View style={{flex: 1, marginTop: 20}}>
            {renderHourlyBoxes()}

            <Modal visible={modalVisible} transparent={true} onRequestClose={()=> {setModalVisible(false)}} animationType='fade'>
                    <SafeAreaView>
                        <ConnectModal fullReminder={selectedReminder} toggleModalVisibility={()=> setModalVisible(false)}></ConnectModal>
                    </SafeAreaView>
            </Modal>
        </View>
    );
}

export {ReminderList};