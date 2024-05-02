// styling for indiviudal tag 

// Tag.styles.ts

import { StyleSheet } from 'react-native';
import { styles as global } from '../../Generic/global.style';

 const styles = StyleSheet.create({
    tagContainer: {
        flexDirection: 'row', // Ensure that the tag and the close button are aligned horizontally
        alignItems: 'center', // Align items vertically within the container
      },
    tag: {
    backgroundColor: global.tagBackground.color,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 10,
    marginRight: 10,
    marginVertical: 5,
  },
  tagText: {
    color: global.tagText.color,
    fontSize: 12,
  },
});

export {styles};
