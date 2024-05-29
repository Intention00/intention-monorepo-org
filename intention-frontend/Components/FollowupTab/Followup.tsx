import { SafeAreaView, Text, View } from "react-native"
import { useState, useEffect } from "react"
import { getDesiredFollups } from "../FollowupTab/followupService";
import { handleUser } from "../ContactsTab/UserSync/userService";
import { useUser } from '@clerk/clerk-expo';
import { userIDContext } from "../ContactsTab/UserSync/userIDContext";
import { ReminderList } from "../RemindersTab/DisplayReminders/ReminderList";
import { NewReminderButton } from "../RemindersTab/DisplayReminders/NewReminderButton";
import SegmentedControl from '@react-native-segmented-control/segmented-control';
import { receiveRemindersFromBackend } from "../Generic/backendService";
import { styles as global } from "../Generic/global.style";
import { FollowUpList } from "./FollowupList";

const FollowUpPage: React.FC = ()=> {
    const [remindersData, setRemindersData] = useState(undefined);
    const [filteredRemindersData, setFilteredRemindersData] = useState(undefined);
    const { user } = useUser();
    const [userID, setUserID] = useState(undefined);
    const userEmail = user['primaryEmailAddress']['emailAddress'];

    const [selectedFreq, setSelectedFreq] = useState("daily");

    useEffect(() => {
        (async () => {
            try {
                const tempUserID = await handleUser(userEmail);
                console.log(`user id: ${tempUserID}`);
                setUserID(tempUserID);
    
                // get the reminders related data and each contact
                const tempRemindersData = await receiveRemindersFromBackend(tempUserID);
                setRemindersData(tempRemindersData);
    
                // get filtered reminders data initially for daily
                const tempFilteredReminders = getDesiredFollups(tempRemindersData);
                setFilteredRemindersData(tempFilteredReminders[selectedFreq]);
                //console.log(tempFilteredReminders);
            } catch (err) {
                console.error(err);
            }
        })();
    }, [selectedFreq]); // Add selectedFreq to the dependency array
    

    const handleFreqChange = async (index: number) => {
        try {
            let freq;
            if (index === 0) {
                freq = "daily";
            } else if (index === 1) {
                freq = "weekly";
            } else if (index === 2) {
                freq = "monthly";
            }
            setSelectedFreq(freq);
            const tempFilteredReminders =  getDesiredFollups(remindersData);
            console.log("here")
            console.log
            setFilteredRemindersData(tempFilteredReminders[selectedFreq]);
            
        } catch (err) {
            console.error(err);
        }
    }

    const createFreqButtons = ()=> {
        return (
            <View>
                <SegmentedControl
                    style={{marginTop: 20,
                        backgroundColor: global.background.backgroundColor,
                        borderRadius: 0, height: 80}}
                    tintColor={global.accentColor.color}
                    activeFontStyle={{color: global.buttonText.color}}
                    values={['Daily', 'Weekly', 'Monthly']}
                    selectedIndex={selectedFreq === "daily" ? 0 : selectedFreq === "weekly" ? 1 : 2}
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
                {createFreqButtons()}
                {(filteredRemindersData === undefined) ? <Text style={{color: 'white'}}>Loading</Text> : <FollowUpList reminders={filteredRemindersData}></FollowUpList>}
                <NewReminderButton></NewReminderButton>
            </userIDContext.Provider>
        </SafeAreaView>
    )
}

export {FollowUpPage};
