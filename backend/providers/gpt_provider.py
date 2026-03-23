import os
from openai import OpenAI
from utils.prompts import SYSTEM_PROMPT

class GPTProvider:
    def __init__(self):
        api_key = os.getenv("OPENAI_API_KEY")
        if not api_key:
            raise RuntimeError("OPENAI_API_KEY not set")

        self.client = OpenAI(api_key=api_key)

    def generate_code(self, prompt: str) -> dict:
        response = self.client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {"role": "system", "content": SYSTEM_PROMPT},
                {"role": "user", "content": prompt},
            ]
        )

        text = response.choices[0].message.content.strip()

        try:
            return eval(text)
        except Exception:
            raise RuntimeError("GPT returned invalid JSON")
