from pydantic import BaseModel

class GenerateRequest(BaseModel):
    project_name: str
    description: str
    language: str
    framework: str
    provider: str = "gemini"  # gemini | gpt
