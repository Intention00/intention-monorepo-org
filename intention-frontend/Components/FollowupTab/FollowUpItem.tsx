import { View, Text } from "react-native";
import { styles } from  './FollowUpItem.style'
import { Image } from "expo-image";

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
    const blurhash = 
    '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';

    return (
        <View style={styles.test1}>
            <View style={{flexDirection:'row', gap:50}}>
                <View style={{alignSelf:'flex-start'}}>
                <Image
                    style={styles.image}
                    source="https:/picsum.photos/seed/696/3000/2000"
                    placeholder={blurhash}
                    contentFit="cover"
                    transition={1000}
                    />
                </View>
                <View style={{justifyContent: 'center',alignItems:'center'}}>
                    <Text style={{color: styles.test1.color, fontSize: 14, textAlign:'center'}}>Update Notes for {reminder.contact.firstName} {reminder.contact.lastName}!</Text>
                </View>
            </View>
        </View>
        
    );
}

export {FollowUpItem};