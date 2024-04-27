import { View, TouchableOpacity, Text } from "react-native"
import { useState, useEffect } from "react"
import { generateQuestions } from "./questionService"
import { shareQuestion } from "../../../ContactsTab/Transcriber/ShareQuestions/shareQuestion"
shareQuestion
import { styles } from "./GenerateQuestions.style"

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
                            <TouchableOpacity style={styles.questionTextBox} onPress={()=> shareQuestion(question)}>
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
                <TouchableOpacity
                    style={styles.generateButton}
                    onPress={handleGenerateQuestions}>
                    <Text style={styles.generateButtonText}>Generate New Questions</Text>
                </TouchableOpacity>
                {displayQuestions()}                
            </View>
    )
}

export {GenerateQuestions}