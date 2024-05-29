import React, { useState } from "react";
import { View, SafeAreaView, Text, FlatList, TouchableHighlight, Modal } from "react-native";
import { ReminderItem } from "../RemindersTab/DisplayReminders/ReminderItem";
import { styles } from "../RemindersTab/DisplayReminders/ReminderList.style";
import { ConnectModal } from "../RemindersTab/ConnectModal/ConnectModal";

const FollowUpList: React.FC<{ reminders: any[] }> = ({ reminders }) => {
    const [selectedReminder, setSelectedReminder] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);

    const onReminderClick = (reminder) => {
        setSelectedReminder(reminder);
        setModalVisible(true);
    };

    const renderRemindersByFrequency = () => {
        const frequencies = ["daily", "weekly", "monthly"]; // Assuming the reminders are grouped by these frequencies
        return (
            <FlatList
                data={frequencies}
                style={styles.reminderList}
                renderItem={({ item }) => (
                    <View>
                        
                        {renderReminders(reminders.filter(reminder => reminder.reminder.frequency === item))}
                        <View style={styles.horizontalDivider}></View>
                    </View>
                )}
                keyExtractor={(item) => item}
            />
        );
    };

    const renderReminders = (reminders) => {
        return reminders.map((reminder, index) => (
            <TouchableHighlight
                key={index}
                style={styles.reminderItem}
                underlayColor={'rgba(10, 10, 10, 0.25)'}
                onPress={() => { onReminderClick(reminder) }}>
                <ReminderItem reminder={reminder}></ReminderItem>
            </TouchableHighlight>
        ));
    };

    return (
        <View style={{ flex: 1, marginTop: 20 }}>
            {renderRemindersByFrequency()}

            <Modal visible={modalVisible} transparent={true} onRequestClose={() => { setModalVisible(false) }} animationType='fade'>
                <SafeAreaView>
                    <ConnectModal fullReminder={selectedReminder} toggleModalVisibility={() => setModalVisible(false)}></ConnectModal>
                </SafeAreaView>
            </Modal>
        </View>
    );
}

export { FollowUpList };
