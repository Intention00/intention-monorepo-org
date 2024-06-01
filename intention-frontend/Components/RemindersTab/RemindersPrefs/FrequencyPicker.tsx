import React from 'react';
import { Picker } from '@react-native-picker/picker';

const FrequencyPicker: React.FC<{ selectedFrequency: any, setSelectedFrequency: any }> = ({ selectedFrequency, setSelectedFrequency }) => {
    const frequencies = ["Daily", "Weekly", "Monthly"];
    
    return (
        <Picker
            selectedValue={selectedFrequency}
            style={{ marginTop: 5, backgroundColor: 'white', borderRadius: 10, alignSelf:'center', width:'90%' }}
            itemStyle={{ backgroundColor: '#FFF', fontSize: 15, height: 50, borderRadius: 10 }}
            onValueChange={(itemValue) => setSelectedFrequency(itemValue)}>
            <Picker.Item label="Select a Frequency" value="" />
            {frequencies.map(frequency => (
                <Picker.Item key={frequency} label={frequency} value={frequency} />
            ))}
        </Picker>
    );
}

export  {FrequencyPicker};
