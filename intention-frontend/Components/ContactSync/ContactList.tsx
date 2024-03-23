import { View, SafeAreaView, FlatList, TouchableHighlight, Modal, Image } from "react-native";
import {ContactItem} from "./ContactItem";
import {ContactModal} from './ContactModal'
import { useState } from "react";

const ContactList: React.FC <{contacts: any[]}> = ({contacts})=> {
    const [selectedContact, setSelectedContact] = useState(undefined);
    const [modalVisible, setModalVisible] = useState(false);

    const onContactClick = (contact)=> {
        setSelectedContact(contact);
        setModalVisible(!modalVisible);
    };



    return (
        <View style={{flex: 1, marginTop: 15, width:'100%'}}>
            <FlatList 
              data={contacts} 
              style={{marginTop: 15, maxHeight: 600}} 
              renderItem={({item})=> (
                    <TouchableHighlight 
                      style={{
                        marginBottom: 20,
                        backgroundColor: 'lightblue',
                        borderRadius: 50,
                        padding: 10
                      }} 
                      underlayColor={'rgba(10, 10, 10, 0.25)'} 
                      onPress={()=> {
                        onContactClick(item)
                      }}
                    >
                        <ContactItem contact={item}></ContactItem>
                    </TouchableHighlight>
                )}/>

                <Modal visible={modalVisible} transparent={true} onRequestClose={()=> {setModalVisible(false)}} animationType="slide">
                    <SafeAreaView>
                        <ContactModal contact={selectedContact} toggleModalVisibility={()=> {setModalVisible(false)}}></ContactModal>
                    </SafeAreaView>
                </Modal>

        </View>
    );
}

export {ContactList};