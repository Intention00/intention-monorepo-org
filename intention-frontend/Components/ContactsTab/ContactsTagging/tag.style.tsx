// styling for indiviudal tag 

// Tag.styles.ts

import { StyleSheet } from 'react-native';

 const styles = StyleSheet.create({
    tagContainer: {
        flexDirection: 'row', // Ensure that the tag and the close button are aligned horizontally
        alignItems: 'center', // Align items vertically within the container
      },
    tag: {
    backgroundColor: '#f0f0f0',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 10,
    marginRight: 10,
    marginVertical: 5,
  },
  tagText: {
    color: '#333',
    fontSize: 12,
  },
});

export {styles};
