import { View, Text } from "react-native";
import { styles } from "./ReminderItem.style";

interface Reminder {
    contact: {
        contactID: number,
        firstName: string;
        lastName: string;
        number: string;
    },
    reminder: {
        dateTime: string,
        frequency: string,
        LastContacted: string
    }
    
}

const ReminderItem: React.FC <{reminder: Reminder}> = ({reminder})=> {

    return (
        <View style={styles.test1}>
            <View style={{flexDirection: 'row'}}>
                <Text style={{color: styles.test1.color}}>Connect with {reminder.contact.firstName} {reminder.contact.lastName}</Text>
            </View>
        </View>
        
    );
}

export {ReminderItem};