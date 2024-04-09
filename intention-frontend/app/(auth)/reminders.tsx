import { View, Text } from 'react-native';
import { useEffect, useState } from 'react';
import { useUser } from '@clerk/clerk-expo';
import { handleUser } from '../../Components/ContactsTab/UserSync/userService';
import { UpcomingReminders } from '../../Components/RemindersTab/UpcomingReminders';
import { styles as global } from '../../Components/Generic/global.style';


const Reminders = () => {
    const { user } = useUser();
    const [firstName, setFirstName] = useState(user.firstName);
    const [lastName, setLastName] = useState(user.lastName);

    // temporary retrieval for userID, need to change for better solution
    const [userID, setUserID] = useState(undefined);
    const userEmail = user['primaryEmailAddress']['emailAddress'];

    useEffect(()=> {
    (async ()=> {
        const tempUserID = await handleUser(userEmail);
        setUserID(tempUserID);
    })()
    }, []);


    return (
        <View style={[{ flex: 1, justifyContent: 'center', alignItems: 'center' }, global.background]}>
            <UpcomingReminders/>
        </View>
    );
};

export default Reminders;
