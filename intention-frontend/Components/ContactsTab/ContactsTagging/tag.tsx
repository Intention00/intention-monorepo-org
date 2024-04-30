// individual tag component 

// tag.tsx

import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import {styles} from './tag.style'

interface TagProps {
  tagName: string;
  onDelete: () => void;
}

const Tag: React.FC<TagProps> = ({ tagName, onDelete }) => {
  return (
    <TouchableOpacity onPress={onDelete}>
      <View style={styles.tag}>
        <Text style={styles.tagText}>{tagName}</Text>
      </View>
    </TouchableOpacity>
  );
};

export { Tag };
