import { receiveUserIDBackend, recieveUserEmailBackend } from "../ContactSync/backendService";

export const handleUser = async (userEmail) => {
    console.log(`Sending to backend: ${userEmail}`);
    const userData = await receiveUserIDBackend(userEmail);
    const userID = userData['UserID']

    console.log(`GOT USER ID: ${userID}`);

    if (userID === -1) {
        // handle new user
        console.log(`NEW USER`);
        return 1;
    }
    else {
        console.log(`EXISTING USER: ${userID}`);
        return userID;
    }

}

export const checkUserEmail = async (userID) =>{
    console.log("sending to backend ${userID}");
    const userData = await recieveUserEmailBackend(userID)
    const userEmail = userData['Email']

    console.log(`GOT USER ID: ${userEmail}`);

    if (userID === -1) {
        // handle new user
        console.log(`Wrong Email`);
        return 1;
    }
    else {
        console.log(`Correct Email: $userEmail}`);
        return userID;
    }
}
