import { View, Text} from "react-native";
import { SelectModel } from "./SelectModel";
import { styles } from "./SelectorPlusHeader.style";


const SelectorPlusHeader: React.FC = ()=> {

    return (
        <View>
            <Text style={styles.selectorText}>
                Select Your Model to Generate Questions
            </Text>
            <SelectModel></SelectModel>
        </View>
    )

}

export {SelectorPlusHeader}