import { View, Text} from "react-native";
import { Image } from 'expo-image'
import { styles } from "./ContactItem.style";
import { useEffect, useState, useContext, useReducer, createContext } from "react";
import { receiveScoreFromBackend, sendScoreToBackend } from "../../Generic/backendService"
import { ConnectModal } from "../../RemindersTab/ConnectModal/ConnectModal";
import { sendScore } from "../../RemindersTab/ConnectModal/ConnectModal";
import { getContactTags, getUserTags, deleteContactTag, addContactTag } from '../../Generic/backendService';
import { userIDContext } from "../UserSync/userIDContext";
import { ContactTags } from "../ContactsTagging/ContactTags";
import { tagUpdater } from "../UserSync/tagUpdater";
import { scoreContext } from "../../Generic/scoreContext";




interface Contact {
    contactID: number,
    firstName: string;
    lastName: string;
    number: string;
    tags: string;
}


const ContactItem: React.FC<{contact: Contact, updateScore}> = ({contact, updateScore})=> {
    const [connectionScore, setConnectionScore] = useState(0);
    const [tags, setTags] = useState([]);
    const userID = useContext(userIDContext);
    const tagStatus = useContext(tagUpdater)
    const scoreStatus = useContext(scoreContext)
    

    useEffect(() => {
        (async () => {
          try {
            const contactTags = await getContactTags(userID, contact.contactID);
            setTags(contactTags);
            
          } catch (error) {
            console.error('Error fetching tags:', error);
          }
        })();
      }, [userID, contact.contactID, tagStatus]);


    useEffect(()=> {
        (async ()=> {
            try {
                // get connection score, and set it in connectionScore
                const tempScore = await receiveScoreFromBackend(contact.contactID);
                setConnectionScore(tempScore.score);
            }
            catch (err) {

            }
        })()
    }, [scoreStatus]);



    // console.log(`Item: ${JSON.stringify(contact)}`)

    const blurhash = 
    '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';

    return (
        <View style={styles.container}>

            <Image
                style={styles.image}
                source="https:/picsum.photos/seed/696/3000/2000"
                placeholder={blurhash}
                contentFit="cover"
                transition={1000}
            />
            
            <View style={styles.containerText}>
                <Text style={styles.nameText}>{contact.firstName} {contact.lastName} </Text>
                <Text style={styles.phoneText}>{tags.join(', ')} </Text>
                
            </View>
            
            <Text style={styles.emoji}> {connectionScore}🔥 </Text>
        </View>
    );
}

export {ContactItem};