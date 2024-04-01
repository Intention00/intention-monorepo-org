import { StyleSheet } from "react-native"

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 5
    },

    background: {
        backgroundColor: '#161616',
    },

    headerText: {
        color: '#ffffff',
    },

    bodyText: {
        color: '#ffffff',
    },

    inputBox: {
        backgroundColor: '#383838',
        color: '#bcbcbc',
    }
})

export {styles}

// const Card = (props) => {
//   return (
//     <div style={styles.Card}>
//       {props.children}
//     </div>
//   );
// };

// export default Card;