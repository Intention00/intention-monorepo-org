"""
    Module used specifically to test the different models against one-another, used to obtain
    raw numbers showing their differences.
"""

from process_notes import ProcessNotes
from audio_processing import initialize_model
import time
import os
import json

gpt_processor = ProcessNotes(model_name='gpt')
llama_processor = ProcessNotes(model_name='llama3')
wizardlm_processor = ProcessNotes(model_name='wizardlm')
mixtral_processor = ProcessNotes(model_name='mixtral')
gpt4o_processor = ProcessNotes(model_name='gpt4o')

def measure_time(processor: ProcessNotes):
    start_time = time.time()
    output = processor.get_summary_questions(6, "Hank")
    end_time = time.time()
    total_time = end_time - start_time
    print(f"Model: {processor.model_name}\nOutput: {output}\nTime: {total_time: .2f}\n")
    result = {
        'model': processor.model_name,
        'output': output,
        'time': total_time
    }
    return total_time, result

def record_time(n = 1):
    os.makedirs('llm', exist_ok=True)
    with open(os.path.join('llm', 'output.json'), 'w') as file:
        gpt_times = []
        llama_times = []
        wizardlm_times = []
        mixtral_times = []
        gpt4o_times = []

        file.write('[')

        for i in range(n):
            gpt_time, gpt_result = measure_time(gpt_processor)
            llama_time, llama_result = measure_time(llama_processor)
            wizardlm_time, wizardlm_result = measure_time(wizardlm_processor)
            mixtral_time, mixtral_result = measure_time(mixtral_processor)
            gpt4o_time, gpt4o_result = measure_time(gpt4o_processor)

            gpt_result['iteration'] = i
            llama_result['iteration'] = i
            wizardlm_result['iteration'] = i
            mixtral_result['iteration'] = i
            gpt4o_result['iteration'] = i

            gpt_times.append(gpt_time)
            llama_times.append(llama_time)
            wizardlm_times.append(wizardlm_time)
            mixtral_times.append(mixtral_time)
            gpt4o_times.append(gpt4o_time)

            json.dump(gpt_result, file)
            file.write(',')
            json.dump(llama_result, file)
            file.write(',')
            json.dump(wizardlm_result, file)
            file.write(',')
            json.dump(mixtral_result, file)
            file.write(',')
            json.dump(gpt4o_result, file)
            file.write(',')

        file.seek(file.tell() - 1)
        file.truncate()
        file.write(']')


        print(f'GPT times: {gpt_times}')
        print(f'Llama times: {llama_times}')
        print(f'Wizardlm times: {wizardlm_times}')
        print(f'Mixtral times: {mixtral_times}')
        print(f'GPT4o times: {gpt4o_times}')

# record_time(1)

def load_models_data(file_name = 'llm/output.json'):
    with open(file_name, 'r') as file:
        data = json.load(file)
        return data
        
def rank_models(data):
    # Select model
    client, model = initialize_model('gpt4o')
    print(f'Scoring model is: {model}')

    response_format = """
        {
            "ranking": [
                {
                    "model": *model name*,
                    "score": *score*
                }
            ],
            "comments": {
                *model name*: *comment*
            }
        }
    """

    response = client.chat.completions.create(
        model=model,
        response_format={'type': 'json_object'},
        messages=[
            {"role": "system", "content": "You are a helpful human assistant. Talking directly to the user."},
            {"role": "user", "content": f"You are given a json object which contains the output of several LLM models. These models are returning personalized questions to help start conversations with my contacts. Evaluate the models and return a score (from 1 to 10) of the models by how good their respective questions were, and which ones humans would prefer the most. Return your response as a json object following this format: {response_format}. Here is the json object: {data}"}
        ],
        # Provide your comments in a key called 'comments'. 
    )

    content_section = response.choices[0].message.content
    print(content_section)
    return content_section

data = load_models_data()
rank_models(data)

# record_time(1)