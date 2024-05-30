import { View, SafeAreaView, FlatList, TouchableHighlight, Modal, Image } from "react-native";
import {ContactItem} from "./ContactItem";
import {ContactModal} from './ContactModal'
import { useState } from "react";
import { styles } from "./ContactList.style";
import { getSummaryFromBackend } from "../../Generic/backendService";


const ContactList: React.FC <{contacts: any[]}> = ({contacts})=> {
    const [selectedContact, setSelectedContact] = useState(undefined);
    const [modalVisible, setModalVisible] = useState(false);
    const [newUser, setNewUser] = useState(true)
    
    const onContactClick = async (contact)=> {
        setSelectedContact(contact);
        const isNewUser = await newUserTrue(contact);
        setNewUser(isNewUser);
        setModalVisible(true);
        
    };

    const newUserTrue = async (contact)=> {
        const summary = await getSummaryFromBackend(contact.contactID);
        if (summary) {
            return false;
        }
        return true;
    }



    return (
        <View style={{flex: 1, marginTop: 15, width:'100%'}}>
            <View style={[styles.horizontalDivider]}></View>
           
            <FlatList 
              data={contacts} 
              style={{marginTop: 0, maxHeight: '100%'}} 
              renderItem={({item})=> (
                <View>
                    <TouchableHighlight 
                        style={styles.contactItem} 
                        underlayColor={'rgba(10, 10, 10, 0.25)'} 
                        onPress={()=> {onContactClick(item)}}>
                        <ContactItem contact={item}></ContactItem>
                    </TouchableHighlight>
                    <View style={styles.horizontalDivider}></View>
                </View>
                    
                    
            )}/>

            <Modal visible={modalVisible} transparent={true} onRequestClose={()=> {setModalVisible(false)}} animationType="fade">
                <SafeAreaView>
                    <ContactModal contact={selectedContact} newUser={newUser} toggleModalVisibility={()=> {setModalVisible(false)}}/>
                </SafeAreaView>
            </Modal>

        </View>
    );
}

export {ContactList};