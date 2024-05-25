import React, {useContext, useEffect, useState} from "react";
import { View, Text, Button} from "react-native"
import {Picker} from '@react-native-picker/picker';
import { userIDContext } from "../../ContactsTab/UserSync/userIDContext";
import { receiveUserModelNameFromBackend, sendUserModelNameToBackend } from "../../Generic/backendService";
import { styles } from "./SelectModel.style";

const SelectModel: React.FC = ()=> {
    const userID = useContext(userIDContext)
    const [selectedModel, setSelectedModel] = useState(undefined);

    useEffect(()=> {
        (async ()=> {
            const tempModelName = await receiveUserModelNameFromBackend(userID);
            if (tempModelName) {
                setSelectedModel(tempModelName);
            }
            else {
                setSelectedModel("gpt");
            }
            
        })()
    }, [userID])

    const displayModelSelection = ()=> {
        if (selectedModel === undefined || selectedModel === null) {
            return (<Text>Loading...</Text>)
        }
        else {
            console.log(`Model is: ${selectedModel}`)
            return (
                <Picker mode="dropdown" style={styles.selector} itemStyle={{height: 120}} selectedValue={selectedModel} onValueChange={(itemValue, itemIndex) =>
                    handleModelSelection(itemValue)}>
                    <Picker.Item color={styles.selectorItem.color} label="GPT" value="gpt"/>
                    <Picker.Item color={styles.selectorItem.color} label="Llama3" value="llama3"/>
                    <Picker.Item color={styles.selectorItem.color} label="Mixtral" value="mixtral"/>
                    <Picker.Item color={styles.selectorItem.color} label="WizardLM" value="wizardlm"/>
                </Picker>
            )
        }
    }

    const handleModelSelection = async (itemValue)=> {
        setSelectedModel(itemValue);
        await sendUserModelNameToBackend(userID, itemValue);
    }

    return(
        <View style={styles.selectorBox}>
            {displayModelSelection()}
        </View>
    )
}

export {SelectModel};