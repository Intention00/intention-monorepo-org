// build out tags
// TaggingScreen.tsx

import React, { useEffect, useState, useContext} from 'react';
import { View, Text, Button, ScrollView, TouchableOpacity, Modal, TextInput } from 'react-native';
import { Tag } from './tag';
import { getContactTags, getUserTags, deleteContactTag, addContactTag } from '../../Generic/backendService';
import { styles } from './ContactTags.style';
import { handleUser } from '../UserSync/userService';
import { useUser } from '@clerk/clerk-expo';
import { userIDContext } from "../UserSync/userIDContext";
import { styles as global } from '../../Generic/global.style';

const ContactTags: React.FC  <{contact}> = ({contact})=> {
  const [tags, setTags] = useState([]);
  const {user} = useUser();
  const userID = useContext(userIDContext);
  const [newTag, setNewTag] = useState('');
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  
  useEffect(() => {
    // Fetch user's tags from the backend when the component mounts
     (async () => {
      try {
        const contactTags = await getContactTags(userID, contact.contactID);
        setTags(contactTags);
        console.log(contactTags);
      } catch (error) {
        console.error('Error fetching contact tags:', error);
      }
     })()
  
    
  }, []);

  const handleAddTag = async () => {
    try {
      // Implement logic to add a tag through the backend API
      await addContactTag(userID, contact.contactID, newTag);
      // After adding the tag, fetch updated list of tags and set state
      const updatedTags =  await getContactTags(userID, contact.contactID);
      setTags(updatedTags);
      setIsModalVisible(false);
    } catch (error) {
      console.error('Error adding tag:', error);
    }
  };

  const handleDeleteTag = async (tagToDelete) => {
    try {
      // Implement logic to delete a tag through the backend API
      await deleteContactTag(userID, contact.contactID, tagToDelete);
      // After deleting the tag, fetch updated list of tags and set state
      const updatedTags = await getContactTags(userID, contact.contactID);
      setTags(updatedTags);
    } catch (error) {
      console.error('Error deleting tag:', error);
    }
  };
  function renderTags() {
    if (!tags) {
        return null; // or some loading indicator
    }
    return tags.map(tag => (
        <Tag key={tag} tagName={tag} onDelete={() => handleDeleteTag(tag)} />
    ));
}

return (
    <View style={styles.container}>
        <Text style={styles.text}>Contact Tags:</Text>
        <ScrollView style={styles.scrollView}>
        {(tags === undefined || tags.length === 0) ? <Text style={global.bodyText}> Add some tags </Text> : renderTags() } 
  
        </ScrollView> 
        <TouchableOpacity style={styles.button} onPress={() => setIsModalVisible(true)}>
            <Text style={styles.buttonText}>Add Tag</Text>
        </TouchableOpacity>
        <Modal
            visible={isModalVisible}
            animationType="slide"
            transparent={true}
        >
            <View style={styles.modalView}>
                <TextInput
                    style={styles.input}
                    placeholder="Enter tag"
                    placeholderTextColor="#999" // Light grey placeholder text
                    value={newTag}
                    onChangeText={text => setNewTag(text)}
                />
                <TouchableOpacity style={styles.modalButton} onPress={handleAddTag}>
                    <Text style={styles.modalButtonText}>Add</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.modalButton} onPress={() => setIsModalVisible(false)}>
                    <Text style={styles.modalButtonText}>Cancel</Text>
                </TouchableOpacity>
            </View>
        </Modal>
    </View>
);
};

export { ContactTags };
