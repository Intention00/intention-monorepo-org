import { View, SafeAreaView, FlatList, TouchableHighlight, Text } from "react-native";
import { ReminderItem } from "./ReminderItem";
import { useState } from "react";
// import { styles } from "../ContactsTab/DisplayContacts/ContactList.style";
import { styles } from "./ReminderList.style";

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
            <FlatList
                data={hours}
                style={{maxHeight: 600}} 
                renderItem={({item})=> (
                    <View>
                        <View style={{flexDirection: 'row'}}>
                            <View style={styles.hourBox}>
                                <Text style={{color: 'gray', textAlign: 'right'}}>{item}:00</Text>
                            </View>
                            <View style={styles.reminderBox}>
                                {renderHourlyReminders(reminders[item])}
                                
                            </View>   
                        </View>
                        <View style={styles.horizontalDivider}></View> 
                    </View>
                    
                )}
            /> 
        );
    };

    return (
        <View style={{flex: 1, marginTop: 150}}>
            {renderHourlyBoxes()}
        </View>
    );
}

export {ReminderList};