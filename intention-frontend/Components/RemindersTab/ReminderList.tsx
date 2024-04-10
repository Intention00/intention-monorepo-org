import { View, SafeAreaView, FlatList, TouchableHighlight, Text } from "react-native";
import { ReminderItem } from "./ReminderItem";
import { useState } from "react";
import { styles } from "../ContactsTab/DisplayContacts/ContactList.style";

const ReminderList: React.FC <{reminders: any[]}> = ({reminders})=> {
    const [selectedReminder, setSelectedReminder] = useState(undefined);

    const onReminderClick = (reminder)=> {
        setSelectedReminder(reminder);
    };



    return (
        <View style={{flex: 1, marginTop: 15, width:'100%'}}>
            <FlatList 
              data={reminders} 
              style={{marginTop: 0, maxHeight: 600}} 
              renderItem={({item})=> (
                <View>
                    <TouchableHighlight 
                        style={styles.contactItem} 
                        underlayColor={'rgba(10, 10, 10, 0.25)'} 
                        onPress={()=> {onReminderClick(item)}}>

                        <ReminderItem reminder={item}></ReminderItem>
                        
                    </TouchableHighlight>
                </View>     
            )}/>
        </View>
    );
}

export {ReminderList};