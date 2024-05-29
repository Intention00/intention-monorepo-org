import { StyleSheet } from "react-native"

const useDarkMode = false
// IGNORE ALL DARK MODE ASPECTS FOR NOW


const styles = StyleSheet.create({
    // Accent color: #ffcc00
    // Primary color: #ffffff
    // Background color: #161616
    // Input box background: #383838
    // Input box color: #bcbcbc
    // Tab bar color: #282828
    // =============================================
    // Azure Radiancce: '#0493FB'
    // Dodger Blue: '#38ACFC'
    // Malibu: '#53B4FB'
    // Sail: '#BDE0F9'
    background: {
        // (Dark Blue)
        backgroundColor: useDarkMode ? '#161616': '#162b4c',
    },

    headerColor: {
        // Blue?
        color: useDarkMode ? '#282828': '#0493FB'
    },

    headerText: {
        color: useDarkMode ? '#ffffff': '#000000',
    },

    bodyText: {
        // White
        color: useDarkMode ? '#ffffff': '#fafafa',
    },

    subText: {
        // White
        color: useDarkMode ? '#bcbcbc': '#fafafa',
    },

    accentColor: {
        // Light Blue
        color: useDarkMode ? '#ffcc00': '#90CAF9',
    },

    inputBox: {
        // White
        backgroundColor: useDarkMode ? '#383838': '#c7c7c7',
        // Shadowy Black
        color: useDarkMode ? '#bcbcbc': '#434343',
    }, 

    tabBarBackground: {
        // Blue
        color: useDarkMode ? '#282828': '#0493FB'
    },

    horizontalDivider: {
        // Shadowy Black
        color: useDarkMode ? '#282828': '#434343'
    },

    buttonText: {
        // Black
        color: useDarkMode ? '#191919': '#161616'
    },

    tagBackground: {
        // Black
        color: useDarkMode ? '#f0f0f0': '#0f0f0f'
    },

    tagText: {
        // White
        color: useDarkMode ? '#333333': '#cccccc'
    },

    tabIcons: {
        color: useDarkMode ? '#0493FB': 'black'
    }



})

export {styles}