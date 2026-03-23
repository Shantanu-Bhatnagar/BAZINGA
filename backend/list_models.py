import os
from google import genai

api_key = os.getenv("GOOGLE_API_KEY")
client = genai.Client(api_key=api_key)

print("Listing available models:")
for m in client.models.list():
    # Use 'capabilities' or 'name' depending on what you want to see
    print(f"Name: {m.name}")