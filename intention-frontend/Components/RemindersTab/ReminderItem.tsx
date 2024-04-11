import { View, Text } from "react-native";

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
    }
    
}

const ReminderItem: React.FC <{reminder: Reminder}> = ({reminder})=> {
    console.log(`Item: ${JSON.stringify(reminder)}`)

    return (
        <View style={{flexDirection: 'row'}}>
            <Text style={{color: 'white'}}>{reminder.contact.firstName} {reminder.contact.lastName}</Text>
            <Text style={{color: 'white'}}>{reminder.reminder.dateTime}</Text>
        </View>
    );
}

export {ReminderItem};