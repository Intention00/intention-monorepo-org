import { View, TouchableOpacity, Text, ScrollView } from "react-native"
import { useState, useEffect } from "react"
import { generateQuestions } from "./questionService"
import { shareQuestion } from "../../../ContactsTab/Transcriber/ShareQuestions/shareQuestion"
shareQuestion
import { styles } from "./GenerateQuestions.style"
import { Ionicons } from '@expo/vector-icons';
import { sendFavoriteQuestionToBackend } from "../../../Generic/backendService"

const GenerateQuestions: React.FC <{contact}> = ({contact})=> {
    const [questions, setQuestions] = useState<string[]>([]);

    useEffect(()=> {
        (async ()=> {
            try {
                const tempQuestions = await generateQuestions(contact);
                setQuestions(tempQuestions);
            }
            catch (err) {
                console.error(err);
            }
        })()
    }, []);

    const handleGenerateQuestions = async ()=> {
        const tempQuestions = await generateQuestions(contact);
        setQuestions(tempQuestions);
    }

    const displayQuestions = ()=> {
        return (
            <View>
                <View style={styles.horizontalDivider}></View>
                {questions.map((question, index) => (
                    <View key={index}>
                        <View style={styles.questionContainer}>
                            <TouchableOpacity style={styles.questionTextBox} onPress={()=> {sendFavoriteQuestionToBackend(contact.contactID, question);shareQuestion(question)}}>
                                <Text style={styles.questionText}>{question}</Text>
                            </TouchableOpacity>                            
                        </View>
                        <View style={styles.horizontalDivider}></View>
                    </View>
                ))}
            </View>           
        )
    }

    return (
        <View style={{ flexDirection: 'column' }}>
                <View style={styles.buttonBox}>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={handleGenerateQuestions}>
                        <Ionicons name="create" size={24} color={styles.icons.color} />
                        <Text style={styles.buttonText}>Generate New Questions</Text>
                    </TouchableOpacity>
                </View>

                {displayQuestions()}  
                              
            </View>
    )
}

export {GenerateQuestions}