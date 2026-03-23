import os
import time
from google import genai


class GeminiProvider:
    def __init__(self):
        api_key = os.getenv("GOOGLE_API_KEY")

        if not api_key:
            raise RuntimeError("GOOGLE_API_KEY is not set")

        self.client = genai.Client(api_key=api_key)
        self.model = os.getenv("GEMINI_MODEL", "gemini-1.5-flash")

    def generate_code(self, prompt: str):
        print("🔵 Gemini request started")

        for attempt in range(3):
            try:
                response = self.client.models.generate_content(
                    model=self.model,
                    contents=prompt,
                    config={
                        "temperature": 0.2
                    }
                )

                if hasattr(response, "text") and response.text:
                    return response.text

                return str(response)

            except Exception as e:
                print(f"⚠️ Attempt {attempt + 1} failed: {e}")

                if attempt < 2:
                    time.sleep(2)
                else:
                    raise Exception(
                        "Gemini API overloaded (503). Please try again."
                    )