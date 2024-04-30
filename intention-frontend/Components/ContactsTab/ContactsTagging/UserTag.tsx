// UserProfileTags.tsx

import React, { useEffect, useState, useContext } from 'react';
import { View, Text, Button, ScrollView, Modal, TextInput, TouchableOpacity } from 'react-native';
import  {Tag}  from './tag'; // Assuming you have a Tag component
import { getUserTags, addTagUser, deleteUserTag } from '../../Generic/backendService'; // Assuming you have backend service functions
import { styles } from './UserTag.style'; // Importing the styles
import { useUser } from '@clerk/clerk-expo';
import { userIDContext } from "../UserSync/userIDContext";
import { handleUser } from '../UserSync/userService';


const UserProfileTags: React.FC = () => {
    const [tags, setTags] = useState();
    const [newTag, setNewTag] = useState('');
    const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
    // const userID = useContext(userIDContext);
    
    const { user } = useUser();
    const [userID, setUserID] = useState(undefined);
    const userEmail = user['primaryEmailAddress']['emailAddress'];

   
    

  
  useEffect(() => {
    // Fetch user's tags from the backend when the component mounts
     (async () => {
      try {
        const tempUserID = await handleUser(userEmail);
        setUserID(tempUserID);
        console.log("user id frontend " + tempUserID)
        const userTags = await getUserTags(tempUserID);
        console.log("PRinting da tags")
        console.log(userTags)
        setTags(userTags);
        
       console.log(userTags);
      } catch (error) {
        console.error('Error fetching user tags:', error);
      }
     })()
  
    
  }, []);


    const handleAddTag = async () => {
        try {
            await addTagUser(userID, newTag); // Add tag via backend service
            console.log("handle addtag called ")
            const updatedTags = await getUserTags(userID); // Fetch updated user tags
            setNewTag(''); // Clear new tag input
            setTags(updatedTags)
            setIsModalVisible(false); // Close modal
        } catch (error) {
            console.error('Error adding tag:', error);
        }
    };

    const handleDeleteTag = async (tagToDelete) => {
        try {
            await deleteUserTag(userID, tagToDelete); // Delete tag via backend service
            const updatedTags = await getUserTags(userID); // Fetch updated user tags
            setTags(updatedTags)
            console.log("handle deletetag called ")
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
            <Text style={styles.text}>Your Tags:</Text>
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

export {UserProfileTags};
