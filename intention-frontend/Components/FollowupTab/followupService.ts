
/*
Reminders (contact_id, reminder_datetime, reminder_frequency)
Values (123, ‘2024-04-10 09:00:00’, 1);
*/

/* 
    should return item of type: 
    {
        contact: {
            contactID: number,
            firstName: string;
            lastName: string;
            number: string;
        }, 
        reminder: {reminder related stuff}
    }
*/
const getDesiredFollups = (reminderData)=> {
    const processedData = processFollowupData1(reminderData);
    return processedData;
    
}

/**
 * Processes the reminders data retrieved from the db. Changes it from
 * string to datetime, allowing us to then further process it going forward.
 */

const processFollowupData = (remindersData) => {
    try {
        // Separate reminders by frequency category
        const separatedReminders = {
            daily: [],
            weekly: [],
            monthly: []
        };

        remindersData.forEach(reminder => {
            const frequency = reminder.reminder.frequency;
            if (frequency === 'daily') {
                separatedReminders.daily.push(reminder);
            } else if (frequency === 'weekly') {
                separatedReminders.weekly.push(reminder);
            } else if (frequency === 'monthly') {
                separatedReminders.monthly.push(reminder);
            }
        });

        return separatedReminders;
        
    } catch (error) {
        console.error(error);
    }
};
const processFollowupData1 = (remindersData) => {
    try {
        console.log('Received remindersData:', remindersData);
        
        // Get the current date and time in Unix time
        const currentDate = new Date().getTime();
        
        // Define the time intervals in milliseconds
        const oneDay = 86400; // one day in milliseconds
        const oneWeek = 604800; // one week in milliseconds
        const oneMonth = 2629743; // one month (approx) in milliseconds
        
        // Initialize an array to hold reminders that need follow-up
        const followUpReminders = [];

        remindersData.forEach(reminder => {
            const frequency = reminder.reminder.frequency; 
            const lastContacted = reminder.reminder.lastContacted;

            console.log(`Checking reminder with frequency ${frequency} and LastContacted ${lastContacted}`);

            if (!lastContacted) {
                console.log('Skipping reminder with no lastContacted date:', reminder);
                return;
            } 

            const lastContactedDate = new Date(lastContacted).getTime();
            console.log(`Parsed lastContactedDate: ${lastContactedDate}`);

            // Check if the reminder should be followed up based on the frequency
            if ((frequency === 'daily' && (currentDate - lastContactedDate) >= oneDay) ||
                (frequency === 'weekly' && (currentDate - lastContactedDate) >= oneWeek) ||
                (frequency === 'monthly' && (currentDate - lastContactedDate) >= oneMonth)) {
                console.log('Adding reminder to followUpReminders:', reminder);
                followUpReminders.push(reminder);
            } 
            
        });
            
        console.log('Filtered followUpReminders:', followUpReminders);
        return followUpReminders;
        
    } catch (error) {
        console.error(error);
        return [];
    }
};


export {getDesiredFollups}