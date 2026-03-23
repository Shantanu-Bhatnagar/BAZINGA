from fastapi import APIRouter
from pydantic import BaseModel
import json
import re

from agents.code_agent import CodeAgent

router = APIRouter()


# ✅ Updated request schema (matches your frontend)
class GenerateRequest(BaseModel):
    project_name: str
    description: str
    language: str
    framework: str
    provider: str = "gemini"


def extract_json(text: str):
    try:
        text = re.sub(r"```json|```", "", text).strip()
        return json.loads(text)
    except Exception as e:
        raise Exception(f"Failed to parse AI response: {e}")


def build_prompt(req: GenerateRequest):
    return f"""
You are an expert software engineer.

Generate a complete {req.language} project using {req.framework}.

Project Name: {req.project_name}
Description: {req.description}

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


@router.post("/generate-project")
def generate_project(req: GenerateRequest):
    agent = CodeAgent(req.provider)

    try:
        prompt = build_prompt(req)

        ai_response = agent.generate_code(prompt)

        parsed = extract_json(ai_response)

        if "files" not in parsed:
            raise Exception("Invalid AI response: 'files' key missing")

        return {
            "status": "success",
            "files": parsed["files"]
        }

    except Exception as e:
        return {
            "status": "error",
            "message": str(e)
        }