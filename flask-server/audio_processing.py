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
    dummy_name = "Hank"
    if notes:
        response = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "You are a helpful assistant. Talking directly to the user."},
                {"role": "user", "content": f"Take this arry of text given of my relationship with {dummy_name}. Immediately provide simple bullet points, explaining the intricacies of our relationship and key details that are useful for me to reference later when reaching out. Only provide those bullet points, don't say anything else. Here is the text: {notes}"}
            ]
        )
        content_section = response.choices[0].message.content
    else:
        content_section = ""
    return content_section

def generate_questions(summary):
    dummy_name = "Hank"
    if summary:
        response = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "You are a helpful human assistant. Talking directly to the user. You provide warm but casual advice. You only return what was asked without any further input."},
                {"role": "user", "content": f"I are trying to reach out to {dummy_name}. It has been a long time and I don't know what to say. Given these notes about our relationship, give me 3 personable introduction text messages I could send to them to start a new conversation. Only return the questions- provide them in the format of an array, with the format [question1, question2, question3]. Here are the notes: {summary}"}
                ]
        )
        content_section = response.choices[0].message.content
    else:
        content_section = ["Please add some notes!", "", ""]


    # Quick fix to fix issue with empty copy buttons and remove quotes and numbers from questions
    # questions = list(filter(lambda x: x.strip(), content_section.split('\n')))
    # questions_without_nums = [question.split('. ')[1].replace('"', '') for question in questions]
    print(f"Q: {content_section}")
    return content_section