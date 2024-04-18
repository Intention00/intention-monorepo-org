import { View, SafeAreaView, FlatList, TouchableHighlight, Text } from "react-native";
import { ReminderItem } from "./ReminderItem";
import { useState } from "react";
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
                                        {(Number(item) > 12 ? Number(item) - 12 : Number(item)) + ' ' + (Number(item) < 12 ? 'AM' : 'PM')}
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
        </View>
    );
}

export {ReminderList};