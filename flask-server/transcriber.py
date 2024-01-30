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
            {"role": "user", "content": f"Summarize the following text: {text}"}
            ]
    )
    content_section = response.choices[0].message.content
    return content_section
    
def generate_questions(text, contact_name):
    response = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": "You are a helpful assistant. Talking directly to the user"},
            {"role": "user", "content": f"Generate questions for me to ask {contact_name} based on the following context I've provided about them: {text}"}
            ]
    )
    content_section = response.choices[0].message.content
    return content_section


# contact = "Andrew"

# print(generate_summary(transcribe()))
# print(generate_questions(transcribe(), contact))

