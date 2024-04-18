import { backendAddress } from "../../../Generic/backendService";

const generateQuestions = async () => {
    try {
        // Make a network request to Flask server
        const response = await fetch(`${backendAddress}/generate-questions`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ text: "Me and Jake met at Subway, where we were both getting ourselves sandwiches. We spoke about the best type of cheese before heading our separate ways." }), // Use the text from the top textbox
        });

        // Handle the response
        const data = await response.json();
        const generatedQuestions = data.questions;

        // Ensure generatedQuestions is an array before setting state
        if (Array.isArray(generatedQuestions)) {
            // Update the state with the generated questions
            return generatedQuestions;
        } else {
            console.error('Generated questions is not an array:', generatedQuestions);

        }
        
        return [];

    } catch (error) {
        console.error('Error generating questions:', error);
    }
};

export {generateQuestions}