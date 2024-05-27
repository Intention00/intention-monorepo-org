from openai import OpenAI
from dotenv import load_dotenv
load_dotenv()
import os

# Initialize model
def initialize_model(model_name = None):
    if model_name == "llama3":
        key = os.getenv("DEEPINFRA_KEY")
        client = OpenAI(
                    api_key=key,
                    base_url="https://api.deepinfra.com/v1/openai",
                )
        model = "meta-llama/Meta-Llama-3-8B-Instruct"
    elif (model_name == "wizardlm"):
        key = os.getenv("DEEPINFRA_KEY")
        client = OpenAI(
                    api_key=key,
                    base_url="https://api.deepinfra.com/v1/openai",
                )
        model = "microsoft/WizardLM-2-8x22B"
    elif (model_name == "mixtral"):
        key = os.getenv("DEEPINFRA_KEY")
        client = OpenAI(
                    api_key=key,
                    base_url="https://api.deepinfra.com/v1/openai",
                )
        model = "mistralai/Mixtral-8x22B-Instruct-v0.1"
    else:
        openai_key = os.getenv("OPENAI_KEY")
        client = OpenAI(api_key = openai_key)
        if model_name == "gpt4o":
            model = "gpt-4o"
        elif model_name == "gpt":
            model = "gpt-3.5-turbo"
        else:
            model = model_name
    
    return client, model

def transcribe():
    # Always want to use openai model for transcription
    client, _ = initialize_model()

    media_file_path = 'temp_audio/recording.m4a'
    media_file = open(media_file_path, 'rb')
    
    text = client.audio.transcriptions.create(
        model = "whisper-1",
        file = media_file,
        response_format="text"
    )
    return text

def generate_summary(text, model_name = None):
    # Select model
    client, model = initialize_model(model_name)

    response = client.chat.completions.create(
        model=model,
        messages=[
            {"role": "system", "content": "You are a helpful assistant. Talking directly to the user"},
            {"role": "user", "content": f"Take this text given of my relationship with (name provided). Immediately provide simple bullet points, explaining the intricacies of our relationship and key details that are useful for me to reference later when reaching out. Here is the text: {text}"}
            ]
    )
    content_section = response.choices[0].message.content
    return content_section
    
# summary generated from all the notes for a given contact
def generate_notes_summary(notes, date, contact_id, model_name = None):
    if notes:
        # Select model
        client, model = initialize_model(model_name)
        print(f'Summary generated with: {model}')

        response = client.chat.completions.create(
            model=model,
            messages=[
                {"role": "system", "content": "You are a helpful human assistant. Talking directly to the user."},
                {"role": "user", "content": f"The current date is: {date}. Take this array of notes and their times and dates, describing one of my relationships and provide simple bullet points, explaining the intricacies of our relationship and key details that are useful for me to reference later when reaching out. Pay close attention to the details between notes and update the summary for any discrepancies- prioritizing the more recent notes as being more accurate. Put information that is most recent at the top of the summary. Your summary should be targeted to me. Only provide those bullet points, don't say anything else. Here are the notes: {notes}."}
            ],
            top_p=0.1
        )
        content_section = response.choices[0].message.content
    else:
        content_section = ""
    return content_section

def generate_questions(summary, newest_note, firstName, style, model_name = None):
    if summary:
        # Select model
        client, model = initialize_model(model_name)
        print(f'Questions generated with: {model}')

        messages_object = [
            {"role": "system", "content": "You are a human chameleon, able to perfectly mimic someone after some analysis. You are talking directly to someone that knows the human you are mimicking."},
            {"role": "user", "content": "Don't say anything outside the json object you return. Ensure you include the opening and closing braces (which are '{' and '}') of the json object."},

            {"role": "user", "content": f"Generate 3 personable ways to reach out to {firstName}. You'll be sending these directly, so make sure they don't require any editing. Only return the questions- provide them in the format of a json object with the keys \"question1\", \"question2\", \"question3\"; put any comments in a separate key called 'comments'. This is an analysis of the conversation style of the human you are mimicking: {style}. Follow the analysis exactly, and act as if that is you. Here are some notes regarding their relationship: {summary}. This is the most recent note between them, place extra emphasis on it: {newest_note}. Keep track of what the human you're mimicking told {firstName}, and what {firstName} told them. Only use the information you have- don't make up any information regarding their past interactions or relationship, and don't make any mistakes. If you don't have enough information to work with, think of some openers that are unrelated to the notes, but they would probably appreciate. Don't mention any other names other than yourself and {firstName}."}, 
        ]

        response = client.chat.completions.create(
            model=model,
            response_format={'type': 'json_object'},
            messages=messages_object,
            top_p=0.4
        )
        content_section = response.choices[0].message.content
    else:
        content_section = "{\"question1\": \"Please add some notes!\", \"question2\": \"\", \"question3\": \"\"}"

    print(f'OUTPUT: {content_section}')

    return content_section, messages_object

# conversational style summarized from all the notes for a given contact
def generate_conversational_style(notes, model_name = None):
    if notes:
        # Select model
        client, model = initialize_model(model_name)
        print(f'Conversation style generated with: {model}')

        response = client.chat.completions.create(
            model=model,
            response_format={'type': 'json_object'},
            messages=[
                {"role": "system", "content": "You are an expert linguist and psychologist writing your analysis about the user. You generate precise notes that accurately contain your analysis of the user's conversation style."},
                {"role": "user", "content": f"Analyze my conversation style from this array of notes describing one of my relationships. Analyze my style concisely, using words and phrases that best describe it as succinctly as possible. Describe everything one would require to mimic my conversational style using bullet points. Put all of your analysis in json format. Here are the notes: {notes}."}
            ],
            top_p=0.1
        )
        content_section = response.choices[0].message.content
    else:
        content_section = ""
    return content_section