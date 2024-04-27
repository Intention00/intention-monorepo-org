// build out tags
// TaggingScreen.tsx

import React, { useEffect, useState } from 'react';
import { View, Text, Button, ScrollView } from 'react-native';
import { Tag } from './tag';
import { apiService } from './apiService';
import { styles } from './ContactTags.style';

const TaggingScreen: React.FC = () => {
  const [tags, setTags] = useState<string[]>([]);
  
  useEffect(() => {
    // Fetch user's tags from the backend when the component mounts
    const fetchTags = async () => {
      try {
        const userTags = await apiService.getUserTags();
        setTags(userTags);
      } catch (error) {
        console.error('Error fetching user tags:', error);
      }
    };

    fetchTags();
  }, []);

  const handleAddTag = async () => {
    try {
      // Implement logic to add a tag through the backend API
      await apiService.addTag('New Tag');
      // After adding the tag, fetch updated list of tags and set state
      const updatedTags = await apiService.getUserTags();
      setTags(updatedTags);
    } catch (error) {
      console.error('Error adding tag:', error);
    }
  };

  const handleDeleteTag = async (tagToDelete: string) => {
    try {
      // Implement logic to delete a tag through the backend API
      await apiService.deleteTag(tagToDelete);
      // After deleting the tag, fetch updated list of tags and set state
      const updatedTags = await apiService.getUserTags();
      setTags(updatedTags);
    } catch (error) {
      console.error('Error deleting tag:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Tags:</Text>
      <ScrollView style={styles.tagContainer}>
        {tags.map(tag => (
          <Tag key={tag} name={tag} onDelete={() => handleDeleteTag(tag)} />
        ))}
      </ScrollView>
      <Button title="Add Tag" onPress={handleAddTag} />
    </View>
  );
};

export { TaggingScreen };
