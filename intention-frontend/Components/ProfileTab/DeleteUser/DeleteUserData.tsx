import React, {useContext} from "react";
import { View, Text, Button} from "react-native"
import {deleteUserData} from './deleteUserService'
import { userIDContext } from "../../ContactsTab/UserSync/userIDContext";
import { styles as global } from "../../Generic/global.style";


const DeleteUserData: React.FC = ()=> {

    const userID = useContext(userIDContext)

    return(
        <View>
            <Button color={'black'} title="Delete User Data" onPress={()=> {deleteUserData(userID)}}></Button>
        </View>
    )
}

export {DeleteUserData};