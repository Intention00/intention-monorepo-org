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
    // Azure Radiancce (Dark Blue): '#0493FB'
    // Dodger Blue (Medium Blue): '#38ACFC'
    // Malibu (Lighter Blue): '#53B4FB'
    // Sail (White-Blue): '#BDE0F9'
    background: {
        // Azure Radiance (Dark Blue)
        backgroundColor: useDarkMode ? '#161616': '#38ACFC',
    },

    headerColor: {
        color: useDarkMode ? '#282828': '#0493FB'
    },

    headerText: {
        color: useDarkMode ? '#ffffff': '#000000',
    },

    bodyText: {
        color: useDarkMode ? '#ffffff': '#000000',
    },

    subText: {
        color: useDarkMode ? '#bcbcbc': '#434343',
    },

    accentColor: {
        color: useDarkMode ? '#ffcc00': '#BDE0F9',
    },

    inputBox: {
        backgroundColor: useDarkMode ? '#383838': '#c7c7c7',
        color: useDarkMode ? '#bcbcbc': '#434343',
    }, 

    tabBarBackground: {
        color: useDarkMode ? '#282828': '#0493FB'
    },

    horizontalDivider: {
        color: useDarkMode ? '#282828': '#BDE0F9'
    },

    buttonText: {
        color: useDarkMode ? '#191919': '#e6e6e6'
    },

    tagBackground: {
        color: useDarkMode ? '#f0f0f0': '#0f0f0f'
    },

    tagText: {
        color: useDarkMode ? '#333333': '#cccccc'
    },

    tabIcons: {
        color: useDarkMode ? '#0493FB': 'black'
    }



})

export {styles}