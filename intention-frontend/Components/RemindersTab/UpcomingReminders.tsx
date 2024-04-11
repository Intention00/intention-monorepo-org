import { SafeAreaView, Text, FlatList } from "react-native"
import { useState, useEffect } from "react"
import { getDesiredReminders } from "./reminderService";
import { handleUser } from "../ContactsTab/UserSync/userService";
import { useUser } from '@clerk/clerk-expo';
import { userIDContext } from "../ContactsTab/UserSync/userIDContext";
import { ReminderList } from "./ReminderList";
import { ReminderItem } from "./ReminderItem";

const UpcomingReminders: React.FC = ()=> {
    const [remindersData, setRemindersData] = useState(undefined);
    const { user } = useUser();
    const [userID, setUserID] = useState(undefined);
    const userEmail = user['primaryEmailAddress']['emailAddress'];

    useEffect(()=> {
        (async ()=> {
            try {
                const tempUserID = await handleUser(userEmail);
                setUserID(tempUserID);

                // get the reminders related data and each contact
                const tempRemindersData = await getDesiredReminders()
                setRemindersData(tempRemindersData)

            }
            catch (err) {
                console.error(err);
            }
            
        })()
    }, []);

    console.log(`RemindersData: ${JSON.stringify(remindersData)}`)

    return (
        <SafeAreaView style={{flex:1, width: '100%'}}>
            <userIDContext.Provider value={userID}>
                {(remindersData === undefined) ? <Text style={{color: 'white'}}>Loading</Text> : <ReminderList reminders={remindersData}></ReminderList>}
            </userIDContext.Provider>
        </SafeAreaView>
    )
}

export {UpcomingReminders};