
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
const getDesiredReminders = (reminderData, selectedDay)=> {
    const processedData = processRemindersData(reminderData, selectedDay);

    return processedData;
}

/**
 * Processes the reminders data retrieved from the db. Changes it from
 * string to datetime, allowing us to then further process it going forward.
 */
const processRemindersData = (remindersData, selectedDay)=> {
    try {
        const currentDate = new Date()
        
        // Does some calculations to adjust the currentDate value to match that
        // of the chosen day
        if (selectedDay !== currentDate.getDay()) {
            currentDate.setDate(currentDate.getDate() - currentDate.getDay() + selectedDay);

            // sets to start of day for whatever day is selected
            currentDate.setHours(0, 0, 0, 0);
            
        }
        
        console.log(`today: ${currentDate.getDay()}`)

        // Checking initial reminders
        // console.log(`INITIAL REMINDERS: ${JSON.stringify(remindersData)}`)

        // To filter the contacts for only the upcoming day (can expand to week, month, etc if req.)
        // (Also might be better to filter on serverside, and then only use those)
        const currentDayReminders = remindersData.filter(reminder=> {
            const reminderDate = new Date(reminder.reminder.dateTime);
            const frequency = reminder.reminder.frequency;

            const currentHour = currentDate.getHours();
            const currentMinute = currentDate.getMinutes();
            const reminderHour = reminderDate.getHours();
            const reminderMinute = reminderDate.getMinutes();

            if (frequency === 'daily') { 
                return (
                    // checks to see if the reminder has already passed today
                    (currentHour < reminderHour) ||
                    (currentHour === reminderHour && currentMinute <= reminderMinute)
                );
            }
            else if (frequency === 'weekly') {
                return (
                    // checks to see if it has been a week
                    (currentDate.getDay() === reminderDate.getDay()) && 
                    // checks to see if the reminder has already passed today
                    ((currentHour < reminderHour) ||
                    (currentHour === reminderHour && currentMinute <= reminderMinute))
                );    
            }

            // Need to decide if based on same day of next month, or same date
            else if (frequency === 'monthly') {
                // Just checking for same date each month for simplicity
                return (
                    (currentDate.getDate() === reminderDate.getDate()) && 
                    // checks to see if the reminder has already passed today
                    ((currentHour < reminderHour) ||
                    (currentHour === reminderHour && currentMinute <= reminderMinute))
                )


            }
        })

        // Checking filtered reminders
        // console.log(`FILTERED REMINDERS: ${JSON.stringify(currentDayReminders)}`)

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

        // Only displays hours that reminders exists for
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