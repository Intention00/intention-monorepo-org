// not styling is more fun

import { SafeAreaView, Text, View } from "react-native"
import { useState, useEffect } from "react"
import { getDesiredReminders } from "../RemindersTab/DisplayReminders/reminderService";
import { handleUser } from "../ContactsTab/UserSync/userService";
import { useUser } from '@clerk/clerk-expo';
import { userIDContext } from "../ContactsTab/UserSync/userIDContext";
import { ReminderList } from "../RemindersTab/DisplayReminders/ReminderList";
import { NewReminderButton } from "../RemindersTab/DisplayReminders/NewReminderButton";
import SegmentedControl from '@react-native-segmented-control/segmented-control';
import { receiveRemindersFromBackend } from "../Generic/backendService";
import { styles as global } from "../Generic/global.style";

const FollowUpPage: React.FC = ()=> {
    const [remindersData, setRemindersData] = useState(undefined);
    const [filteredRemindersData, setFilteredRemindersData] = useState(undefined);
    const { user } = useUser();
    const [userID, setUserID] = useState(undefined);
    const userEmail = user['primaryEmailAddress']['emailAddress'];

    const [selectedDay, setSelectedDay] = useState(0);

    useEffect(()=> {
        (async ()=> {
            try {
                const tempUserID = await handleUser(userEmail);
                console.log(`user id: ${tempUserID}`)
                setUserID(tempUserID);

                const tempSelectedDay = new Date().getDay();
                setSelectedDay(tempSelectedDay);

                // get the reminders related data and each contact
                const tempRemindersData = await receiveRemindersFromBackend(tempUserID);
                setRemindersData(tempRemindersData);

                // get filtered reminders data
                const tempFilteredReminders = getDesiredReminders(tempRemindersData, tempSelectedDay);
                setFilteredRemindersData(tempFilteredReminders);
            }
            catch (err) {
                console.error(err);
            }
            
        })()
    }, []);

    const handleFreqChange = async (index: number) => {
        try {
            const tempFilteredReminders = await getDesiredReminders(remindersData, index);
            setFilteredRemindersData(tempFilteredReminders);
            setSelectedDay(index);
        } catch (err) {
            console.error(err);
        }
    }

    const createDayButtons = ()=> {
        return (
            <View>
                <SegmentedControl
                    style={{marginTop: 20,
                        backgroundColor: global.background.backgroundColor,
                        borderRadius: 0, height: 80}}
                    tintColor={global.accentColor.color}
                    activeFontStyle={{color: global.buttonText.color}}
                    values={['Daily', 'Weeklky', 'Monthly']}
                    selectedIndex={selectedDay}
                    onChange={(event) => {
                    handleFreqChange(event.nativeEvent.selectedSegmentIndex);
                    }}
                />
            </View>
        )
    }

   

    return (
        <SafeAreaView style={{flex:1, width: '100%'}}>
            <userIDContext.Provider value={userID}>
                {createDayButtons()}
                {(filteredRemindersData === undefined) ? <Text style={{color: 'white'}}>Loading</Text> : <ReminderList reminders={filteredRemindersData}></ReminderList>}
                <NewReminderButton></NewReminderButton>
            </userIDContext.Provider>
        </SafeAreaView>
    )
}

export {FollowUpPage};