import { View, Text } from "react-native";
import { Image } from 'expo-image'
import { styles } from "./ContactItem.style";

interface Contact {
    contactID: number,
    firstName: string;
    lastName: string;
    number: string;
}

const ContactItem: React.FC<{contact: Contact}> = ({contact})=> {

    console.log(`Item: ${JSON.stringify(contact)}`)

    const blurhash = 
    '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';

    return (
        <View style={styles.container}>
            <Image
                style={styles.image}
                source="https:/picsum.photos/seed/696/3000/2000"
                placeholder={blurhash}
                contentFit="cover"
                transition={1000}
            />

            <View style={styles.containerText}>
                <Text style={styles.nameText}>{contact.firstName} {contact.lastName} </Text>
                <Text style={styles.phoneText}>Phone: {contact.number}</Text>
            </View>
            
        </View>
    );
}

export {ContactItem};