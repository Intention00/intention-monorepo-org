import { backendAddress } from "../../../Generic/backendService";

const generateQuestions = async (contact) => {
    try {
        // Make a network request to Flask server
        const response = await fetch(`${backendAddress}/api/generate-questions?contactID=${contact.contactID}
        &firstName=${contact.firstName}`, {
            method: 'GET',
        });

        // Handle the response
        const data = await response.json();
        // const generatedQuestions = JSON.parse(data.questions);
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