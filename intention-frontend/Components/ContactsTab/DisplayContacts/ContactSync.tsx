import React, { useEffect, useState } from 'react';
import {View, Text, SafeAreaView} from 'react-native';
import { sendContactsToBackend, receiveContactsFromBackend, receiveUserIDBackend } from '../../Generic/backendService';
import { saveContactsFromUser } from './contactService';
import {ContactList} from './ContactList';
import { userIDContext } from '../UserSync/userIDContext';
import { useUser } from '@clerk/clerk-expo';
import { handleUser } from '../UserSync/userService';
import { SyncContactButton } from '../SyncContacts/SyncContactButton';
import { styles as global } from '../../Generic/global.style';
import { SearchBar } from "../SyncContacts/SyncSearch"
import { tagUpdater } from '../UserSync/tagUpdater';



const ContactSync: React.FC = ()=> {

    const [error, setError] = useState(undefined);
    const [contacts, setContacts] = useState(undefined);
    const { user } = useUser();
    const [userID, setUserID] = useState(undefined);
    const userEmail = user['primaryEmailAddress']['emailAddress'];
    
    const [searchPhrase, setSearchPhrase] = useState("");
    const [clicked, setClicked] = useState(false);
    const [filteredContacts, setFilteredContacts] = useState([]);
    const [tagStatus, setTagStatus] = useState(false);

    useEffect(()=> {
        (async ()=> {
            setError(undefined);
            try {
                // const fetchedContacts = await saveContactsFromUser();
                const tempUserID = await handleUser(userEmail);
                setUserID(tempUserID);

                // Set contacts to those retrieved from database
                const recContacts = await receiveContactsFromBackend(tempUserID);
                setContacts(recContacts);

            }
            catch (err) {
                setError(err.message);
            }
            
        })()

  
        
    }, []);
    useEffect(() => {
        //  console.log("Search phrase updated:", searchPhrase); //
          if (searchPhrase === "") {
              setFilteredContacts(contacts);
          } else {
              const filtered = contacts.filter(contact => {
                  const fullNameWithTags = `${contact.firstName} ${contact.lastName}${contact.tags}`.toLowerCase();
                  return fullNameWithTags.includes(searchPhrase.toLowerCase());
  
          });
              setFilteredContacts(filtered);
          }
      }, [searchPhrase, contacts]);

    
    const noContactsMessage = ()=> {
        if (filteredContacts === undefined) {
            return (<Text style={global.bodyText}></Text>)
        }
        else if (filteredContacts.length === 0) {
            return (<Text style={global.bodyText}>Use the sync button above to add some contacts!</Text>)
        }
        else {
            return (<ContactList contacts={filteredContacts}></ContactList>)
        }
    }
            

    // either make new component, and set them in inline style
    // or could make view in same bar, and then style view into inline <-- do this
    return (
        <SafeAreaView style={{flex:1, width: '100%'}}>
            <userIDContext.Provider value={userID}>
                <tagUpdater.Provider value={{tagStatus, setTagStatus}}>
                    <Text style={{marginTop: 10}}>{error}</Text>
                    <View style= {{flexDirection: 'column'}}>
                        
                        <View style={{width: '100%',}}>
                            <SearchBar
                                clicked={clicked}
                                searchPhrase={searchPhrase}
                                setSearchPhrase={setSearchPhrase}
                                setClicked={setClicked}/>
                                
                        </View>
                        
                    </View>
                    
                    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                        {noContactsMessage()}
                        {/* {(filteredContacts === undefined || filteredContacts.length === 0) ? (<Text style={global.bodyText}>Use the sync button above to add some contacts!</Text>) : (<ContactList contacts={filteredContacts}></ContactList>)} */}
                    </View>
                    <SyncContactButton updateContacts={setContacts}></SyncContactButton>

                </tagUpdater.Provider>

            </userIDContext.Provider>
        </SafeAreaView>
    );
};

export {ContactSync};