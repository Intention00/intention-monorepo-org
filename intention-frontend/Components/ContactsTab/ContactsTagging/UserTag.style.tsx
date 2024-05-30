// UserTag.style.tsx

import { StyleSheet } from 'react-native';

import { styles as global } from "../../Generic/global.style";


 const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: global.background.backgroundColor,
    borderRadius: 20,

  },
  text: {
    color: global.bodyText.color, // white text for dark background
    margin: 10,
  },
  scrollView: {
    color: '#fff' ,
    marginHorizontal: 20,
    borderColor: global.accentColor.color,
    maxHeight: '60%'
  },
  tag: {
    backgroundColor: '#333', // lighter shade of grey for tags
    borderRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 10,
    margin: 5,
    borderWidth: 1,
    borderColor: '#555', // even lighter border color for contrast
  },
  tagText: {
    color: '#fff',
    fontSize: 16,
  },
  button: {
    backgroundColor: global.background.backgroundColor, // buttons in light grey to contrast the dark background
    padding: 10,
    margin: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    
  },
  modalView: {
    margin: 20,
    backgroundColor: '#222', // modal background
    borderRadius: 5,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    color: '#fff', // white color for modal text
  },
  modalButton: {
    backgroundColor: global.accentColor.color,
    borderRadius: 5,
    padding: 10,
    elevation: 2,
  },
  modalButtonText: {
    color: global.buttonText.color,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  input: {
    height: 40,
    // width: '90%',
    borderColor: global.accentColor.color, // input border color
    borderWidth: 1,
    marginTop: 10,
    paddingHorizontal: 10,
    color: '#fff', // input text color
    borderRadius: 5,
    marginBottom: 5,
  },
});


export {styles}