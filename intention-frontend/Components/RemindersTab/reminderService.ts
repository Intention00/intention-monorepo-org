
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
const getDesiredReminders = async ()=> {
    const reminderData = [
        {
            contact: {contactID: -2, firstName: 'John', lastName: 'Doe', number: '0000000000'}, 
            reminder: {dateTime: '2024-04-11 19:30:00', frequency: 'monthly'}
        },

        {
            contact: {contactID: -2, firstName: 'Adam', lastName: 'Berk', number: '0000000000'}, 
            reminder: {dateTime: '2024-04-11 19:45:00', frequency: 'monthly'}
        },

        {
            contact: {contactID: -1, firstName: 'Ted', lastName: 'Kline', number: '0000000000'}, 
            reminder: {dateTime: '2024-04-11 09:00:00', frequency: 'weekly'}
        }, 
        {
            contact: {contactID: -2, firstName: 'Alex', lastName: 'Martelli', number: '0000000000'}, 
            reminder: {dateTime: '2024-04-11 14:00:00', frequency: 'monthly'}
        }
    ];

    const processedData = processRemindersData(reminderData);

    return processedData;
}

/**
 * Processes the reminders data retrieved from the db. Changes it from
 * string to datetime, allowing us to then further process it going forward.
 */
const processRemindersData = (remindersData)=> {
    try {
        // To check the current day, month, and year
        const currentDate = new Date();

        // To filter the contacts for only the upcoming day (can expand to week, month, etc if req.)
        // (Also might be better to filter on serverside, and then only use those)
        const currentDayReminders = remindersData.filter(reminder=> {
            const reminderDate = new Date(reminder.reminder.dateTime);
            return (
                currentDate.getDay() === reminderDate.getDay() &&
                currentDate.getMonth() === reminderDate.getMonth() &&
                currentDate.getFullYear() === reminderDate.getFullYear()
            )
        })

        // Sort the reminders from most recent to least recent.
        // Determines which time is greater, and uses that to sort.
        currentDayReminders.sort((x, y)=> {
            const dateX = new Date(x.reminder.dateTime);
            const dateY = new Date(y.reminder.dateTime);
            return dateX.getTime() - dateY.getTime();
        })

        // Bundle reminders into hours, so that we can then easily display them later
        // const bundledReminders = {
        //     0: [], 1: [], 2: [], 3: [], 4: [], 5: [], 6: [], 7: [], 8: [], 9: [], 10: [], 11: [], 12: [],
        //     13: [], 14: [], 15: [], 16: [], 17: [], 18: [], 19: [], 20: [], 21: [], 22: [], 23: [], 24: [],
        // };

        const bundledReminders = {};
        currentDayReminders.forEach((reminder) => {
            const reminderData = new Date(reminder.reminder.dateTime);
            const hourBucket = reminderData.getHours();

            // check to see if exists, if so then push, otherwise create
            if(bundledReminders[hourBucket]) {
                bundledReminders[hourBucket].push(reminder);
            } else {
                bundledReminders[hourBucket] = [reminder];
            }
        })

        return bundledReminders;
        
    } catch (error) {
        console.error(error);
    }

}


export {getDesiredReminders}