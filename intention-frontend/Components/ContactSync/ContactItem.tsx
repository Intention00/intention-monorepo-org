import { View, Text } from "react-native";

interface Contact {
    firstName: string;
    lastName: string;
    phoneNumber: object;
}

const ContactItem: React.FC<{contact: Contact}> = ({contact})=> {



    return (
        <View>
            <Text>First Name: {contact.firstName}</Text>
            <Text>Last Name: {contact.lastName}</Text>
            <Text>Phone: 000-000-0000</Text>
        </View>
    );
}

export default ContactItem;


{/* <ContactItem contact={{firstName: 'test', lastName: 'person', phoneNumber: {}}}></ContactItem> */}