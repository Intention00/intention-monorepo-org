import { Button, View } from "react-native"
import React from "react"
import {shareQuestion} from './shareQuestion'

const ShareButton: React.FC = ()=> {

    return (
        <View>
            <Button title="Share" onPress={()=> shareQuestion('Test message!')}></Button>
        </View>
    )
}

export {ShareButton}