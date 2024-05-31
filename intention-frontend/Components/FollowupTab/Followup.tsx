import React, { useState, useEffect } from "react";
import { SafeAreaView, Text, View } from "react-native";
import { getDesiredFollups } from "../FollowupTab/followupService";
import { handleUser } from "../ContactsTab/UserSync/userService";
import { useUser } from '@clerk/clerk-expo';
import { userIDContext } from "../ContactsTab/UserSync/userIDContext";
import { NewReminderButton } from "../RemindersTab/DisplayReminders/NewReminderButton";
import { receiveRemindersFromBackend } from "../Generic/backendService";
import { styles as global } from "../Generic/global.style";
import { FollowUpList } from "./FollowupList";

const FollowUpPage: React.FC = () => {
    const [remindersData, setRemindersData] = useState([]);
    const [filteredRemindersData, setFilteredRemindersData] = useState([]);
    const { user } = useUser();
    const [userID, setUserID] = useState(undefined);
    const userEmail = user['primaryEmailAddress']['emailAddress'];

    useEffect(() => {
        (async () => {
            try {
                const tempUserID = await handleUser(userEmail);
                console.log(`user id: ${tempUserID}`);
                setUserID(tempUserID);

                // get the reminders related data and each contact
                const tempRemindersData = await receiveRemindersFromBackend(tempUserID);
                console.log('Received reminders data:', tempRemindersData);
                setRemindersData(tempRemindersData);

                // get filtered reminders data
                const tempFilteredReminders = getDesiredFollups(tempRemindersData);
                console.log('Filtered reminders data:', tempFilteredReminders);
                setFilteredRemindersData(tempFilteredReminders);
            } catch (err) {
                console.error(err);
            }
        })();
    }, []); // Run only once when the component mounts

    return (
        <SafeAreaView style={{ flex: 1, width: '100%' }}>
            <userIDContext.Provider value={userID}>
                {/* {(filteredRemindersData.length === 0) ? 
                    <Text style={{ color: 'white' }}>Loading</Text> : 
                    <FollowUpList reminders={filteredRemindersData}></FollowUpList>
                } */}

                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                    {(filteredRemindersData === undefined || filteredRemindersData.length === 0) ? (<Text style={global.bodyText}>No Reminders to follow up on today!</Text>) : (<FollowUpList reminders={filteredRemindersData}></FollowUpList>)}
                </View>
            </userIDContext.Provider>
        </SafeAreaView>
    )
}

export { FollowUpPage };
