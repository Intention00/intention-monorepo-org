
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
const getDesiredFollups = (reminderData, freq)=> {
    const processedData = processFollowupData(reminderData);
    return processedData
    
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


export {getDesiredFollups}