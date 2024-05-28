import { StyleSheet } from "react-native"

const useDarkMode = false

const styles = StyleSheet.create({
    // Accent color: #ffcc00
    // Primary color: #ffffff
    // Background color: #161616
    // Input box background: #383838
    // Input box color: #bcbcbc
    // Tab bar color: #282828
    background: {
        backgroundColor: useDarkMode ? '#161616': '#BDE0F9',
    },

    headerText: {
        color: useDarkMode ? '#ffffff': '#0493FB',
    },

    bodyText: {
        color: useDarkMode ? '#ffffff': '#000000',
    },

    subText: {
        color: useDarkMode ? '#bcbcbc': '#434343',
    },

    accentColor: {
        color: useDarkMode ? '#ffcc00': '#0033ff'
    },

    inputBox: {
        backgroundColor: useDarkMode ? '#383838': '#c7c7c7',
        color: useDarkMode ? '#bcbcbc': '#434343',
    }, 

    tabBarBackground: {
        color: useDarkMode ? '#282828': '#d7d7d7'
    },

    horizontalDivider: {
        color: useDarkMode ? '#282828': '#d7d7d7'
    },

    buttonText: {
        color: useDarkMode ? '#191919': '#e6e6e6'
    },

    tagBackground: {
        color: useDarkMode ? '#f0f0f0': '#0f0f0f'
    },

    tagText: {
        color: useDarkMode ? '#333333': '#cccccc'
    }



})

export {styles}