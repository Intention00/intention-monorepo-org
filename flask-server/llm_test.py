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
    with open(os.path.join('llm', 'model_responses.json'), 'w') as file:
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

def load_models_data(file_name = 'llm/model_responses.json'):
    with open(file_name, 'r') as file:
        data = json.load(file)
        return data
    
def export_model_ranking(model_name, data):
    json_data = json.loads(data)
    os.makedirs('llm', exist_ok=True)
    with open(os.path.join('llm', f'ranking_{model_name}.json'), 'w') as file:
        json.dump(json_data, file)
        
def rank_models(model_name, data):
    # Create processor to format response
    processor = ProcessNotes(model_name=model_name)

    # Select model
    client, model = initialize_model(model_name)
    print(f'Scoring model is: {model}')

    response_format = """
        {
            "ranking": [
                {
                    "model": *model name*,
                    "rank": *rank*
                }
            ],
            best_questions: [
                *iteration*: *best question*
            ],
        }
    """
            #     "comments": {
            #     *model name*: *comment*
            # }

    response = client.chat.completions.create(
        model=model,
        response_format={'type': 'json_object'},
        messages=[
            {"role": "system", "content": "You are a helpful human assistant. Talking directly to the user."},
            {"role": "user", "content": f"You are given a json object which contains the output of several LLM models. These models are returning personalized questions to help start conversations with my contacts. Evaluate the models and return a ranking of the models (0 being the best) amongst themselves by how good their respective questions were, and which ones humans would prefer the most. Also pick the best question from each iteration amongst all the models and put it in the key 'best_questions'. Return your response as a json object following this format: {response_format}. Don't provide any extra comments explaining your thoughts or what you'll be doing. Here is the json object: {data}"}
        ],
        # Provide your comments in a key called 'comments'. 
    )

    content_section = response.choices[0].message.content
    formatted_content = processor.format_llm_output(content_section)

    print(formatted_content)
    return formatted_content

def rank_export(model_name):
    data = load_models_data()
    ranking = rank_models(model_name, data)
    export_model_ranking(model_name, ranking)


# record_time(2)

rank_export('gpt')