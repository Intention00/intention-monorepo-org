// UserTag.style.tsx

import { StyleSheet } from 'react-native';
import { styles as global } from '../../Generic/global.style'

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    //backgroundColor: '#333333', // dark background
    width: '100%',
    // width: 280,
    marginLeft: 35,
    marginRight: 20,
    alignSelf: 'center',
    padding: 5,
    borderRadius: 5,
    // verticalAlign: 'middle',
    // alignItems: 'center',
    // alignContent: 'center'
    
  },
  text: {
    color: '#fff', // white text for dark background
    margin: 10,
  },
  scrollView: {
    marginHorizontal: 20,
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
    fontSize: 12,
  },
  button: {
    // backgroundColor: '#555', // buttons in light grey to contrast the dark background
    // padding: 10,
    // margin: 10,
    // borderRadius: 5,
    // alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },

  modalCenter: {
    height: '100%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  

  modalView: {
    margin: 20,
    height: 340,
    backgroundColor: '#222', // modal background
    borderRadius: 30,
    padding: '8%',
    paddingLeft: '4%',
    paddingTop: '4%',
    alignItems: 'flex-start',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    width: 320,
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
    backgroundColor: '#555',
    borderRadius: 5,
    padding: 10,
    elevation: 2,
    width: '40%', // Adjust the width to fit side by side
  },
  modalButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalButtonContainer: {
    flexDirection: 'row',  // Layout buttons in a row
    justifyContent: 'space-evenly',  // Even space between buttons
    width: '100%', // Ensure the container takes full width
    padding: 10,  // Padding around the container
  },
  input: {
    height: 40,
    borderColor: '#777', // input border color
    borderWidth: 1,
    marginTop: 10,
    paddingHorizontal: 10,
    color: '#fff', // input text color
    borderRadius: 5,
  },

  modalExit :{
    color: global.accentColor.color,
    fontSize: 30,
    paddingLeft: 0,
},

modalHeader: {
    paddingTop: 0,
    marginBottom: 30,
    flexDirection: 'row',
    alignItems: 'center'
},

modalHeaderText: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 15 ,
    marginRight: 8,
    fontWeight: 'bold',
},
});

export { styles };
