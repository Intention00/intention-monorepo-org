import React from 'react';
import {View, Text} from 'react-native';
import ContactSync from '../ContactSync/ContactSync';

const Home: React.FC = ()=> {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ContactSync></ContactSync>
        </View>
        
    );
};

export default Home;