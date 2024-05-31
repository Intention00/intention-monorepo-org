import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet} from "react-native";
import { SelectModel } from "./SelectModel";
import { styles } from "./SelectorPlusHeader.style";
import {styles as global} from '../../Generic/global.style';
import { SelectModelDetails } from './SelectModelDetails';

const SelectorPlusHeader: React.FC = ()=> {

    return (
        <View>
            {/* <Text style={styles.settingsText}>Settings</Text> */}
            <Text style={styles.selectorText}>Select Your Model to Generate Questions</Text>
            
            <View style={{flexDirection: 'column'}}>
                <SelectModel></SelectModel>
                <View style={{}}>
                    <SelectModelDetails></SelectModelDetails>
                </View>
            </View>
            
        </View>
    )

}

export {SelectorPlusHeader}