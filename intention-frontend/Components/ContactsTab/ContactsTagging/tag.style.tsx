// styling for indiviudal tag 

// Tag.styles.ts

import { StyleSheet } from 'react-native';
import { styles as global } from '../../Generic/global.style';

 const styles = StyleSheet.create({
    tagContainer: {
        flexDirection: 'column', // Ensure that the tag and the close button are aligned horizontally
        alignItems: 'center', // Align items vertically within the container
      },
    tag: {
    backgroundColor: global.accentColor.color,
    width: 'auto',
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginRight: 5,
    marginLeft: 5,
    marginVertical: 5,
  },
  tagText: {
    color: global.buttonText.color,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 14,
  },
});

export {styles};
