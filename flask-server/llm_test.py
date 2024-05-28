"""
    Module used specifically to test the different models against one-another, used to obtain
    raw numbers showing their differences.
"""

from process_notes import ProcessNotes
from audio_processing import initialize_model
import time
import os
import json
import math

gpt_processor = ProcessNotes(model_name='gpt')
llama_processor = ProcessNotes(model_name='llama3')
wizardlm_processor = ProcessNotes(model_name='wizardlm')
mixtral_processor = ProcessNotes(model_name='mixtral')
gpt4o_processor = ProcessNotes(model_name='gpt4o')
gpt_single_processor = ProcessNotes(model_name="gpt_single")
gpt_multiple_processor = ProcessNotes(model_name="gpt_multiple")

# Get updated model names for newest FT
gpt_single_processor.get_finetuned_model_database()
gpt_multiple_processor.get_finetuned_model_database()

all_models = ['gpt', 'llama3', 'wizardlm', 'mixtral', 'gpt4o', gpt_single_processor.model_name, gpt_multiple_processor.model_name]
scoring_models = ['gpt', 'llama3', 'wizardlm', 'mixtral', 'gpt4o']

def measure_time(processor: ProcessNotes):
    start_time = time.time()
    output = processor.get_summary_questions(302, "Daniel")
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
        gpt_single_times = []
        gpt_multiple_times = []

        file.write('[')

        for i in range(n):
            gpt_time, gpt_result = measure_time(gpt_processor)
            llama_time, llama_result = measure_time(llama_processor)
            wizardlm_time, wizardlm_result = measure_time(wizardlm_processor)
            mixtral_time, mixtral_result = measure_time(mixtral_processor)
            gpt4o_time, gpt4o_result = measure_time(gpt4o_processor)
            gpt_single_time, gpt_single_result = measure_time(gpt_single_processor)
            gpt_multiple_time, gpt_multiple_result = measure_time(gpt_multiple_processor)

            gpt_result['iteration'] = i
            llama_result['iteration'] = i
            wizardlm_result['iteration'] = i
            mixtral_result['iteration'] = i
            gpt4o_result['iteration'] = i
            gpt_single_result['iteration'] = i
            gpt_multiple_result['iteration'] = i

            gpt_times.append(gpt_time)
            llama_times.append(llama_time)
            wizardlm_times.append(wizardlm_time)
            mixtral_times.append(mixtral_time)
            gpt4o_times.append(gpt4o_time)
            gpt_single_times.append(gpt_single_time)
            gpt_multiple_times.append(gpt_multiple_time)

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
            json.dump(gpt_single_result, file)
            file.write(',')
            json.dump(gpt_multiple_result, file)
            file.write(',')

        file.seek(file.tell() - 1)
        file.truncate()
        file.write(']')


        print(f'GPT times: {gpt_times}')
        print(f'Llama times: {llama_times}')
        print(f'Wizardlm times: {wizardlm_times}')
        print(f'Mixtral times: {mixtral_times}')
        print(f'GPT4o times: {gpt4o_times}')
        print(f'GPT_SINGLE times: {gpt_single_times}')
        print(f'GPT_MULTI times: {gpt_multiple_times}')

# record_time(1)

def load_models_data(file_name = 'model_responses.json'):
    try: 
        file_name = 'llm/' + file_name
        with open(file_name, 'r') as file:
            data = json.load(file)
            return data
    except Exception as err:
        print('failed in load_models_data:', err)
    
def export_model_ranking(model_name, data):
    try:
        json_data = json.loads(data)
        os.makedirs('llm', exist_ok=True)
        with open(os.path.join('llm', f'ranking_{model_name}.json'), 'w') as file:
            json.dump(json_data, file)
    except Exception as err:
        print(f'{model_name} failed in export_model_ranking:', err)
        
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
                    "score": *avg score for all the questions for this model (out of 100)*,
                    "score_reasoning": *reason for the score*,
                    "category_scores*: {
                        *avg score for each category*
                    },
                    "rank": *rank*
                }
            ]
        }
    """

    scoring_rubric = """
        {
            "scoring_rubric": {
                "relevance": {
                    "description": "How relevant is the question to the given context or previous conversation?",
                    "max_score": 25
                },
                "engagement": {
                    "description": "How engaging is the question? Does it encourage further conversation?",
                    "max_score": 25
                },
                "specificity": {
                    "description": "How specific is the question? Does it reference details that make it unique and tailored?",
                    "max_score": 20
                },
                "clarity": {
                    "description": "How clear and easy to understand is the question?",
                    "max_score": 20
                },
                "originality": {
                    "description": "How original or creative is the question?",
                    "max_score": 10
                }
            }
        }
    """

    response = client.chat.completions.create(
        model=model,
        response_format={'type': 'json_object'},
        max_tokens=0,
        messages=[
            {"role": "system", "content": "You are a helpful human assistant. Talking directly to the user."},
            {"role": "user", "content": "Return valid JSON. Don't put any comments before or after the JSON object. Return the response format requested exactly."},
            {"role": "user", "content": f"You are given a json object which contains the output of several LLM models. These models are returning personalized questions to help start conversations with my contacts. Evaluate the models by assigning a score out of 100 for each question using the following rubric: {scoring_rubric}, and then return the average of the 3 questions for each model. Go through each category of the rubric closely and detailed and assess the question based on that- be extremely brutal and nitpicky about the rubric criteria while scoring, and then return a score that a human would agree with. Then return an overall ranking of all the models amongst themselves by how good their scores were (starts with 0 being the best). Order the ranking response array from best to worst by rank. Return your response as a json object following this format: {response_format}. Don't provide any extra comments explaining your thoughts or what you'll be doing. Make sure you return valid JSON. Don't put ellipses or any other invalid json placeholders in your response. Here is the json object: {data}"}
        ],
        # Provide your comments in a key called 'comments'. 
    )

    content_section = response.choices[0].message.content
    formatted_content = processor.format_llm_output(content_section)
    print(formatted_content, '\n\n')
    return formatted_content

def rank_export(model_name):
    data = load_models_data()
    ranking = rank_models(model_name, data)
    export_model_ranking(model_name, ranking)

def rank_export_all(models = scoring_models):
    for model in models:
        rank_export(model)

def get_model_scores(models = scoring_models):
    # Used to store the ranks for each model from all the different models
    rankings = {model_name: [] for model_name in all_models}

    # Opens and reads for each model that judged the models
    for model_name in models:
        file_name = 'ranking_' + model_name + '.json'
        try: 
            ranking = load_models_data(file_name)

            # The model name and rank for each model that this model judged are added to its
            # list in rankings
            for model, rank in ((mr['model'], mr['score']) for mr in ranking['ranking']):           
                rank_arr = rankings.get(model, None)
                if rank_arr is not None:
                    rank_arr.append(rank)
        except:
            print(f'{file_name} doesn\'t exist!')
    
    return rankings

def get_avg_model_score():
    all_scores = get_model_scores()
    avg_scores = []

    for model, scores in all_scores.items():
        # avg_score = sum(scores) / len(scores) if scores else -1
        # avg_score = (1 - (sum(scores) / len(scores) / len(scores))) if scores else -1

        # calc_score = 0
        # for score in scores:
        #     calc_score += (len(all_scores) - score) *  (len(all_scores) - score)

        # calc_score = (calc_score / (len(all_scores) * len(all_scores) * len(scores)))
        # avg_scores.append({model: calc_score})
        avg_score = sum(scores) / len(scores) if scores else -1
        avg_scores.append({model: round(avg_score, 3)})
    
    print(avg_scores)

# record_time(7)
# rank_export('wizardlm')
# rank_export_all() 
get_avg_model_score()