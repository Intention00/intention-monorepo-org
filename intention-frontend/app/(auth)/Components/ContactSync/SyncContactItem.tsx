import { View, Text, StyleSheet } from "react-native";
import { Image } from 'expo-image'

interface Contact {
    contactID: number,
    firstName: string;
    lastName: string;
    number: string;
}

const SyncContactItem: React.FC<{contact: Contact}> = ({contact})=> {

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

            {/* <Text>UserID: {userID}</Text>
            <Text>ContactID: {contact.contactID}</Text>
            <Text>First Name: {contact.firstName}</Text>
            <Text>Last Name: {contact.lastName}</Text> */}
            <View style={styles.containerText}>
                <Text style={styles.nameText}>{contact.firstName} {contact.lastName}</Text>
                <Text style={styles.phoneText}>Phone: {contact.number}</Text>
            </View>
            
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 5
    },

    image: {
        width: 50, 
        height: 50,
        borderRadius: 25,
        marginRight: 10,
    },

    containerText: {
        flex: 1,
    },

    nameText: {
        fontSize: 18,
        fontWeight: 'bold',
    },

    phoneText: {
        fontSize: 16
    }

})







export {SyncContactItem};


{/* <ContactItem contact={{firstName: 'test', lastName: 'person', phoneNumber: {}}}></ContactItem> */}