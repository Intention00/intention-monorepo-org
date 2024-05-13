"""
    Module used specifically to test the different models against one-another, used to obtain
    raw numbers showing their differences.
"""

from process_notes import ProcessNotes
import time
import os
import json

gpt_processor = ProcessNotes(model_name='gpt')
llama_processor = ProcessNotes(model_name='llama3')
wizardlm_processor = ProcessNotes(model_name='wizardlm')

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
    with open(os.path.join('llm', 'output.txt'), 'w') as file:
        gpt_times = []
        llama_times = []
        wizardlm_times = []

        file.write('[')

        for i in range(n):
            gpt_time, gpt_result = measure_time(gpt_processor)
            llama_time, llama_result = measure_time(llama_processor)
            wizardlm_time, wizardlm_result = measure_time(wizardlm_processor)

            gpt_result['iteration'] = i
            llama_result['iteration'] = i
            wizardlm_result['iteration'] = i

            gpt_times.append(gpt_time)
            llama_times.append(llama_time)
            wizardlm_times.append(wizardlm_time)

            json.dump(gpt_result, file)
            file.write(',')
            json.dump(llama_result, file)
            file.write(',')
            json.dump(wizardlm_result, file)
            file.write(',')

        file.seek(file.tell() - 1)
        file.truncate()
        file.write(']')


        print(f'GPT times: {gpt_times}')
        print(f'Llama times: {llama_times}')
        print(f'Wizardlm times: {wizardlm_times}')

record_time(2)