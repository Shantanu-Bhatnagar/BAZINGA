from providers.router import get_provider

class CodeAgent:
    def __init__(self, provider: str):
        self.provider = get_provider(provider)

    def generate_code(self, prompt: str) -> dict:
        return self.provider.generate_code(prompt)
    prompt = f"""
Generate a project.

Return ONLY JSON in this format:

{{
  "files": [
    {{
      "path": "filename",
      "content": "file content"
    }}
  ]
}}

Do NOT include explanations.
Do NOT include markdown.
"""