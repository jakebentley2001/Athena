from openai import OpenAI
import os

api_key = os.getenv("OPENAI_KEY")
client = OpenAI(api_key=api_key)