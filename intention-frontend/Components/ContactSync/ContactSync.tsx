import React, { useEffect, useState } from 'react';
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

    let [error, setError] = useState(undefined);
    let [contacts, setContacts] = useState(undefined);

    useEffect(()=> {
        console.log("made inside try block.");
        (async ()=> {
            console.log("made inside async func");
            try {
                const {status} = await Contacts.requestPermissionsAsync();
                if (status === 'granted') {
                    const { data } = await Contacts.getContactsAsync({
                        fields: [
                            Contacts.Fields.Birthday,
                            Contacts.Fields.Emails,
                            Contacts.Fields.FirstName,
                            Contacts.Fields.LastName,
                            Contacts.Fields.PhoneNumbers
                        ]
                    });

                    if (data.length > 0) {
                        console.log(data);
                        setContacts(data);
                        
                    } else {
                        setError("No contacts available");
                    }
                } else {
                    setError('Permission to access contacts denied.');
                }
            }
            catch (err) {
                console.log("Error with promise: ", err);
            }
            
        })()
        
    }, [])


    return (
        <View>
            <Text>Syncing</Text>
        </View>
    );
};

export default ContactSync;