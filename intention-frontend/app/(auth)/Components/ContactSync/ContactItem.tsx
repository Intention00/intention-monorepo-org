import { View, Text } from "react-native";
import { userIDContext } from "../UserSync/userIDContext";
import { useContext } from "react";

interface Contact {
    contactID: number,
    firstName: string;
    lastName: string;
    number: string;
}

const ContactItem: React.FC<{contact: Contact}> = ({contact})=> {

    console.log(`Item: ${JSON.stringify(contact)}`)
    const userID = useContext(userIDContext)

    return (
        <View>
            <Text>UserID: {userID}</Text>
            <Text>ContactID: {contact.contactID}</Text>
            <Text>First Name: {contact.firstName}</Text>
            <Text>Last Name: {contact.lastName}</Text>
            <Text>Phone: {contact.number}</Text>
        </View>
    );
}

export {ContactItem};


{/* <ContactItem contact={{firstName: 'test', lastName: 'person', phoneNumber: {}}}></ContactItem> */}