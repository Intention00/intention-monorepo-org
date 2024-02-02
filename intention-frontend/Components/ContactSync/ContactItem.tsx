import { View, Text } from "react-native";

interface Contact {
    contactID: number,
    firstName: string;
    lastName: string;
    number: string;
}

const ContactItem: React.FC<{contact: Contact}> = ({contact})=> {

    console.log(`Item: ${JSON.stringify(contact)}`)

    return (
        <View>
            <Text>ContactID: {contact.contactID}</Text>
            <Text>First Name: {contact.firstName}</Text>
            <Text>Last Name: {contact.lastName}</Text>
            <Text>Phone: {contact.number}</Text>
        </View>
    );
}

export default ContactItem;


{/* <ContactItem contact={{firstName: 'test', lastName: 'person', phoneNumber: {}}}></ContactItem> */}