import { backendAddress } from "../ContactSync/backendService";

export const deleteUserData = async (userID: number)=> {
    try {
        const response = await fetch(`${backendAddress}/api/users/${userID}`, {
            method: 'DELETE',
        })

        if (!response.ok) {
            const errorMessage = await response.json();
            console.error(`Server returned an error: ${JSON.stringify(errorMessage)}`);
        }
        else {
            return "User data deleted."
        }
    } 
    catch (error) {
        throw new Error(`Error deleting user data from backend: ${error}`);
    }
}

export const deleteUser = async (userID: number)=> {
    try {
        const response = await fetch(`${backendAddress}/api/users/${userID}?full=true`, {
            method: 'DELETE',
        })

        if (!response.ok) {
            const errorMessage = await response.json();
            console.error(`Server returned an error: ${JSON.stringify(errorMessage)}`);
        }
        else {
            return "User deleted."
        }
    } 
    catch (error) {
        throw new Error(`Error deleting user from backend: ${error}`);
    }
}