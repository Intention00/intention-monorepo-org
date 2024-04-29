import React, { useEffect, useState } from 'react';
import { View, Text, Button, ScrollView, Modal, TextInput } from 'react-native';
import { Tag } from './tag'; // Assuming you have a Tag component
import { getUserTags, addTag, deleteTag } from '../../Generic/backendService'; // Assuming you have backend service functions
import { handleUser } from '../UserSync/userService';
import { useUser } from '@clerk/clerk-expo';

const UserProfileTags: React.FC = () => {
  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState<string>('');
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const {user} = useUser();
  const [userID, setUserID] = useState<string | undefined>(undefined);
 
  useEffect(() => {
    // Update userID state when user is available
    if (user) {
      setUserID(userID);
      
    }
  }, [user]);

  useEffect(() => {
    // Fetch user tags when userID is available
    if (userID) {
      fetchUserTags();
    }
  }, [userID]);

  const fetchUserTags = async () => {
    try {
      const response = await getUserTags(userID); // Fetch user tags from backend
      const userTags = response.tags()
      setTags(userTags);
      
    } catch (error) {
      console.error('Error fetching user tags:', error);
    }
  };

  const handleAddTag = async () => {
    try {
      await addTag(newTag); // Add tag via backend service
      fetchUserTags(); // Fetch updated user tags
      setNewTag(''); // Clear new tag input
      setIsModalVisible(false); // Close modal
    } catch (error) {
      console.error('Error adding tag:', error);
    }
  };

  const handleDeleteTag = async (tagToDelete: string) => {
    try {
      await deleteTag(tagToDelete); // Delete tag via backend service
      fetchUserTags(); // Fetch updated user tags
    } catch (error) {
      console.error('Error deleting tag:', error);
    }
  };

  return (
    <View>
      <Text>Your Tags:</Text>
      <ScrollView>
        {tags.map(tag => (
          <Tag key={tag} tagName={tag} onDelete={() => handleDeleteTag(tag)} />
        ))}
      </ScrollView>
      <Button title="Add Tag" onPress={() => setIsModalVisible(true)} />
      <Modal visible={isModalVisible} animationType="slide">
        <View>
          <TextInput
            placeholder="Enter tag"
            value={newTag}
            onChangeText={text => setNewTag(text)}
          />
          <Button title="Add" onPress={handleAddTag} />
          <Button title="Cancel" onPress={() => setIsModalVisible(false)} />
        </View>
      </Modal>
    </View>
  );
};

export {UserProfileTags};
