
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
    return [
        {
            contact: {contactID: -1, firstName: 'test', lastName: 'item', number: '0000000000'}, 
            reminder: {time: '12PM'}
        }, 
        {
            contact: {contactID: -2, firstName: 'test2', lastName: 'item2', number: '0000000000'}, 
            reminder: {time: '4PM'}
        }
    ];
}

export {getDesiredReminders}