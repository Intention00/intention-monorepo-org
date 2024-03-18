import { Button } from "react-native"
import { syncContacts } from "./contactService"
import { userIDContext } from "../UserSync/userIDContext";
import { useContext } from "react";


const SyncContactButton: React.FC = ()=> {
    const userID = useContext(userIDContext)
    return (
        <Button title="Sync Contacts" onPress={()=>{syncContacts(userID)}}></Button>
    )

}

export {SyncContactButton}