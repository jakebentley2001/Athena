#from openai import OpenAI
# client = OpenAI()

# completion = client.chat.completions.create(
#     model="gpt-4o-mini",
#     messages=[
#         {"role": "system", "content": "You are a helpful assistant."},
#         {
#             "role": "user",
#             "content": "Write a haiku about recursion in programming."
#         }
#     ]
# )

# print(completion.choices[0].message)

# import openai
# import os
# # Set your OpenAI API key
# openai.api_key = os.getenv("OPENAI_API_KEY")

# # Make a request to the ChatCompletion endpoint
# response = openai.ChatCompletion.create(
#     model="gpt-4",
#     messages=[
#         {"role": "system", "content": "You are a helpful assistant."},
#         {
#             "role": "user",
#             "content": "Write a haiku about recursion in programming."
#         },
#     ]
# )

# # Print the response
# print(response.choices[0].message['content'])

from openai import OpenAI
import os

api_key = os.getenv("OPENAI_API_KEY")

# Initialize the client
client = OpenAI(api_key=api_key)

# Make the API call
# response = client.chat.completions.create(
#     model="gpt-3.5-turbo",
#     messages=[
#         {"role": "user", "content": "What is the capital of France?"}
#     ]
# )

# # Print the response
# print(response.choices[0].message.content)

def generate_response(query):
    better_query = f"explain this: {query}"

    response = client.chat.completions.create(
    model="gpt-3.5-turbo",
    messages=[{"role": "user", "content": better_query}]
    )

    final_response = response.choices[0].message.content

    return final_response