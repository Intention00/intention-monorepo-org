import React, {useContext, useState} from "react";
import { View, Text, Button} from "react-native"
import {Picker} from '@react-native-picker/picker';
import { userIDContext } from "../../ContactsTab/UserSync/userIDContext";

const SelectModel: React.FC = ()=> {
    const userID = useContext(userIDContext)
    const [selectedModel, setSelectedModel] = useState(undefined);

    return(
        <View>
            <Picker selectedValue={selectedModel} onValueChange={(itemValue, itemIndex) =>
                setSelectedModel(itemValue)}>

                <Picker.Item label="GPT" value="gpt"/>
                <Picker.Item label="Llama3" value="llama3"/>

            </Picker>
        </View>
    )
}

export {SelectModel};