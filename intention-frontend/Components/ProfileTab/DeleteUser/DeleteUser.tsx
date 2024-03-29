import React, {useContext} from "react";
import { View, Text, Button} from "react-native"
import {deleteUser} from './deleteUserService'
import {deleteUserData} from './deleteUserService'
import { userIDContext } from "../../ContactsTab/UserSync/userIDContext";

const DeleteUser: React.FC = ()=> {

    const userID = useContext(userIDContext)

    return(
        <View>
            <Button title="Delete User" onPress={()=> {deleteUser(userID)}}></Button>
        </View>
    )
}

export {DeleteUser};