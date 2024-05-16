import React, {useContext, useEffect, useState} from "react";
import { View, Text, Button} from "react-native"
import {Picker} from '@react-native-picker/picker';
import { userIDContext } from "../../ContactsTab/UserSync/userIDContext";
import { receiveUserModelNameFromBackend, sendUserModelNameToBackend } from "../../Generic/backendService";

const SelectModel: React.FC = ()=> {
    const userID = useContext(userIDContext)
    const [selectedModel, setSelectedModel] = useState(undefined);

    useEffect(()=> {
       (async ()=> {
            const tempModelName = await receiveUserModelNameFromBackend(userID);
            setSelectedModel(tempModelName);
        })()
    }, [userID])

    const displayModelSelection = ()=> {
        if (selectedModel === undefined || selectedModel === null) {
            return (<Text>Loading...</Text>)
        }
        else {
            console.log(`Model is: ${selectedModel}`)
            return (
                <Picker style={{backgroundColor: 'white'}} selectedValue={selectedModel} onValueChange={(itemValue, itemIndex) =>
                    handleModelSelection(itemValue)}>
                    <Picker.Item label="GPT" value="gpt"/>
                    <Picker.Item label="Llama3" value="llama3"/>
                    <Picker.Item label="Mixtral" value="mixtral"/>
                    <Picker.Item label="WizardLM" value="wizardlm"/>
                </Picker>
            )
        }
    }

    const handleModelSelection = async (itemValue)=> {
        setSelectedModel(itemValue);
        await sendUserModelNameToBackend(userID, itemValue);
    }

    return(
        <View>
            {displayModelSelection()}
        </View>
    )
}

export {SelectModel};