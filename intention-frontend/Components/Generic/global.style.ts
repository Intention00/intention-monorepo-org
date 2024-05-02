import { StyleSheet } from "react-native"

const useDarkMode = true

const styles = StyleSheet.create({
    // Accent color: #ffcc00
    // Primary color: #ffffff
    // Background color: #161616
    // Input box background: #383838
    // Input box color: #bcbcbc
    // Tab bar color: #282828
    background: {
        backgroundColor: '#161616',
    },

    headerText: {
        color: '#ffffff',
    },

    bodyText: {
        color: '#ffffff',
    },

    subText: {
        color: '#bcbcbc',
    },

    accentColor: {
        color: '#ffcc00'
    },

    inputBox: {
        backgroundColor: '#383838',
        color: '#bcbcbc',
    }
})

export {styles}