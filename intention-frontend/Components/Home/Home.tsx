import React from 'react';
import {View, Text} from 'react-native';
import ContactSync from '../ContactSync/ContactSync';

const Home: React.FC = ()=> {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>This is text</Text>
            <View>
                <ContactSync></ContactSync>
            </View>
        </View>
        
    );
};

export default Home;