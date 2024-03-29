import React, {useContext} from "react";
import { View, Text, Button} from "react-native"
import {deleteUserData} from './deleteUserService'
import { userIDContext } from "../../ContactsTab/UserSync/userIDContext";


const DeleteUserData: React.FC = ()=> {

    const userID = useContext(userIDContext)

    return(
        <View>
            <Button title="Delete User Data" onPress={()=> {deleteUserData(userID)}}></Button>
        </View>
    )
}

export {DeleteUserData};