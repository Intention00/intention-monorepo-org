import React, { useEffect } from 'react';
import {View, Text} from 'react-native';
import * as Contacts from 'expo-contacts';

const ContactSync: React.FC = ()=> {

    // useEffect(()=>{
    //     (async ()=> {
    //         const {status} = await Contacts.requestPermissionsAsync();
    //         if (status === 'granted') {
    //             const {data} = await Contacts.getContactsAsync({fields: [Contacts.Fields.Emails],});

    //             if (data.length > 0) {
    //                 const contact = data[0];
    //                 console.log(contact);
    //             }
    //         }
    //     })
    // })


    return (
        <View>
            <Text>Syncing</Text>
        </View>
    );
};

export default ContactSync;