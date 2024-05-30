import React, { useEffect, useState, useContext} from 'react';
import { View, Text, Button, ScrollView, TouchableOpacity, Modal, TextInput } from 'react-native';
import { Tag } from './tag';
import { getContactTags, getUserTags, deleteContactTag, addContactTag } from '../../Generic/backendService';
import { styles } from './ContactTags.style';
import { useUser } from '@clerk/clerk-expo';
import { userIDContext } from "../UserSync/userIDContext";
import { styles as global } from '../../Generic/global.style';
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';

const ContactTags: React.FC<{contact}> = ({contact})=> {
  const [tags, setTags] = useState([]);
  const {user} = useUser();
  const userID = useContext(userIDContext);
  const [userTags, setUserTags] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const contactTags = await getContactTags(userID, contact.contactID);
        const availableUserTags = await getUserTags(userID);
        setTags(contactTags);
        setUserTags(availableUserTags);
      } catch (error) {
        console.error('Error fetching tags:', error);
      }
    })();
  }, [userID, contact.contactID]);

  const handleAddTag = async (tag) => {
    try {
      await addContactTag(userID, contact.contactID, tag);
      const updatedTags =  await getContactTags(userID, contact.contactID);
      setTags(updatedTags);
      setIsModalVisible(false);
    } catch (error) {
      setIsModalVisible(false);
      console.error('Error adding tag:', error);
    }
  };

  const handleDeleteTag = async (tagToDelete) => {
    try {
      await deleteContactTag(userID, contact.contactID, tagToDelete);
      const updatedTags = await getContactTags(userID, contact.contactID);
      setTags(updatedTags);
    } catch (error) {
      console.error('Error deleting tag:', error);
    }
  };

  function renderTags() {
    return tags.map(tag => (
      <Tag key={tag} tagName={tag} onDelete={() => handleDeleteTag(tag)} />
    ));
  }

  function renderUserTags() {
    return userTags.map(tag => (
      <Tag key={tag} tagName={tag} onDelete={() => handleAddTag(tag)} />
    ));
  }

  return (
    <View style={styles.container}>
      <Text style={{color: '#bcbcbc', margin: 0, fontSize: 15}}>Tags:</Text>
      <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
        <View style={{flex: 7, flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap'}}>
          {(tags.length === 0) ? <Tag key={"NoTag"} tagName={"No Tags"} onDelete={() => handleDeleteTag(null)}/> : renderTags()}  
        </View>
        <View style={{flex: 3}}>
          <Tag key={"AddTag"} tagName={"Add Tags"} onDelete={() => setIsModalVisible(true)}/>
        </View>
      </View>

      <Modal
        visible={isModalVisible}
        animationType="slide"
        transparent={true}
      >
        <View style={styles.modalCenter}>
          <View style={styles.modalView}>
          <View style={styles.modalHeader}>
                    <MaterialCommunityIcons style={styles.modalExit} name="window-close" onPress={() => setIsModalVisible(false)} />
                    <View style={{flex: 1}}>
                        <Text style={styles.modalHeaderText}>Click a Tag to Add</Text>
                    </View>
                </View>
            {/* <View style={{alignSelf: 'center'}}>
            <Text style={{textAlign: 'center', fontWeight: 'bold', color: '#fff', margin: 0, fontSize: 15 ,paddingBottom: 15}}>Click a Tag to Add</Text>
            </View> */}
            <View style={{ height: '70%', width:'auto', padding:0 ,backgroundColor: global.background.backgroundColor,flexWrap: 'wrap',flexDirection: 'row'}}>
            {renderUserTags()}
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export { ContactTags };
