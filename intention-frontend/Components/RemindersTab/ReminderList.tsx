import { View, SafeAreaView, FlatList, TouchableHighlight, Text } from "react-native";
import { ReminderItem } from "./ReminderItem";
import { useState } from "react";
import { styles } from "../ContactsTab/DisplayContacts/ContactList.style";

const ReminderList: React.FC <{reminders: any[]}> = ({reminders})=> {
    const [selectedReminder, setSelectedReminder] = useState(undefined);

    const onReminderClick = (reminder)=> {
        setSelectedReminder(reminder);
    };

    const renderHourlyReminders = (hourlyReminders) => {
        return (
            <View>
                {hourlyReminders.map((reminder, index) => (
                    <TouchableHighlight 
                        key={index}
                        style={styles.contactItem}
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
                {hours.map(hour => (
                    <View key={hour}>
                        <Text style={{color: 'gray'}}>{hour}:00</Text>
                        {renderHourlyReminders(reminders[hour])}
                    </View>
                ))}
            </View>
        );
    };

    return (
        <View style={{flex: 1, marginTop: 15, width:'100%'}}>
            {renderHourlyBoxes()}
        </View>
    );
}

export {ReminderList};