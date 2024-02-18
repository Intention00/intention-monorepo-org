import { receiveUserIDBackend } from "../ContactSync/backendService";


export const handleUser = async (userEmail) => {
    console.log(`Sending to backend: ${userEmail}`);
    const userData = await receiveUserIDBackend(userEmail);
    const userID = userData['UserID']

    console.log(`GOT USER ID: ${userID}`);

    if (userID === -1) {
        // handle failed userid retrieval
        console.log(`UserID Fail`);
        // Showing default user 1 instead
        return 1;
    }
    else {
        console.log(`EXISTING/ADDED USER: ${userID}`);
        return userID;
    }

}
