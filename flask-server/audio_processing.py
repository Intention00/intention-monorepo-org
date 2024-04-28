from openai import OpenAI
from dotenv import load_dotenv
load_dotenv()
import os

# should not keep visible, bad practice
openai_key = os.getenv("OPENAI_KEY")
client = OpenAI(api_key = openai_key)

def transcribe():
    media_file_path = 'temp_audio/recording.m4a'
    media_file = open(media_file_path, 'rb')
    
    text = client.audio.transcriptions.create(
        model = "whisper-1",
        file = media_file,
        response_format="text"
    )
    return text

def generate_summary(text):
    response = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": "You are a helpful assistant. Talking directly to the user"},
            {"role": "user", "content": f"Take this text given of my relationship with (name provided). Immediately provide simple bullet points, explaining the intricacies of our relationship and key details that are useful for me to reference later when reaching out. Here is the text: {text}"}
            ]
    )
    content_section = response.choices[0].message.content
    return content_section
    
# def generate_questions(text):
#     response = client.chat.completions.create(
#         model="gpt-3.5-turbo",
#         messages=[
#             {"role": "system", "content": "You are a helpful assistant. Talking directly to the user"},
#             {"role": "user", "content": f"You are trying to reach out to (name provided). It has been a long time and you don't know what to say. Given these notes about the last time you spoke with them, give me 3 introduction text messages I could send to them to start a new conversation: {text}"}
#             ]
#     )
#     content_section = response.choices[0].message.content

#     # Quick fix to fix issue with empty copy buttons and remove quotes and numbers from questions
#     questions = list(filter(lambda x: x.strip(), content_section.split('\n')))
#     questions_without_nums = [question.split('. ')[1].replace('"', '') for question in questions]

#     return questions_without_nums

# summary generated from all the notes for a given contact
def generate_notes_summary(notes, contact_id):
    if notes:
        response = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "You are a helpful human assistant. Talking directly to the user."},
                {"role": "user", "content": f"Take this array of notes describing one of my relationships and immediately provide simple bullet points, explaining the intricacies of our relationship and key details that are useful for me to reference later when reaching out. Only provide those bullet points, don't say anything else. Here are the notes: {notes}"}
            ],
            top_p=0.1
        )
        content_section = response.choices[0].message.content
    else:
        content_section = ""
    return content_section

def generate_questions(summary, firstName):
    if summary:
        # add dont assume timeline
        print(f"Name was: {firstName}")
        response = client.chat.completions.create(
            model="gpt-3.5-turbo",
            response_format={'type': 'json_object'},
            messages=[
                {"role": "system", "content": "You are a helpful human assistant. Talking directly to the user. You provide warm and casual advice. You only return what was asked without any further input. You don't ask any further questions. You also don't use emojis."},

                {"role": "user", "content": f"I am trying to reach out to {firstName} and don't know what to say. Given some notes about our relationship, give me 3 personable introduction text messages I could send to them to start a new conversation. I'll be sending these directly, so make sure they don't require any editing. For example, don't generate any questions that require me to replace placeholders with my name or any other personalized information- only use the information you have. Only return the questions- provide them in the format of a json object with the keys \"question1\", \"question2\", \"question3\". Make sure the questions you generate are organic, and can start a natural conversation. Also make sure to keep track of what I told {firstName}, and what they told me."}, 
                 
                {"role": "user", "content": f"Here are the notes: {summary}"}
            ],
            top_p=0.1
        )
        content_section = response.choices[0].message.content
    else:
        content_section = "{\"question1\": \"Please add some notes!\", \"question2\": \"\", \"question3\": \"\"}"

    return content_section