import { View, Text } from "react-native";
import { styles } from  './FollowUpItem.style'

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

const FollowUpItem: React.FC <{reminder: Reminder}> = ({reminder})=> {

    return (
        <View style={styles.test1}>
            <View style={{flexDirection: 'row', alignSelf: 'center'}}>
                <Text style={{color: styles.test1.color, fontSize: 14}}>Update Notes for {reminder.contact.firstName} {reminder.contact.lastName}!</Text>
            </View>
        </View>
        
    );
}

export {FollowUpItem};