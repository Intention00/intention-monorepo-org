import React, { useState } from "react";
import { View, SafeAreaView, FlatList, TouchableHighlight, Modal } from "react-native";
import { FollowUpItem } from "./FollowUpItem";
import { styles } from "../RemindersTab/DisplayReminders/ReminderList.style";
import { ConnectModal } from "../RemindersTab/ConnectModal/ConnectModal";

const FollowUpList: React.FC<{ reminders: any[] }> = ({ reminders }) => {
    const [selectedReminder, setSelectedReminder] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);

    const onReminderClick = (reminder) => {
        setSelectedReminder(reminder);
        setModalVisible(true);
    };

    const renderReminders = (reminders) => {
        return reminders.map((reminder, index) => (
            <TouchableHighlight
                key={index}
                style={styles.reminderItem}
                underlayColor={'rgba(10, 10, 10, 0.25)'}
                onPress={() => { onReminderClick(reminder) }}>
                <FollowUpItem reminder={reminder}></FollowUpItem>
            </TouchableHighlight>
        ));
    };

    return (
        <View style={{ flex: 1, marginTop: '20%', width: 450, marginLeft: 0 }}>
            <FlatList
                data={reminders}
                renderItem={({ item }) => renderReminders([item])}
                keyExtractor={(item, index) => index.toString()}
            />

            <Modal visible={modalVisible} transparent={true} onRequestClose={() => { setModalVisible(false) }} animationType='fade'>
                <SafeAreaView>
                    <ConnectModal fullReminder={selectedReminder} toggleModalVisibility={() => setModalVisible(false)}></ConnectModal>
                </SafeAreaView>
            </Modal>
        </View>
    );
}

export { FollowUpList };
