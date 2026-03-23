from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List
import base64
import requests

router = APIRouter()

# =========================
# MODELS
# =========================

class File(BaseModel):
    path: str
    content: str


class GitHubPushRequest(BaseModel):
    repo_name: str
    files: List[File]
    access_token: str


# =========================
# PUSH TO GITHUB
# =========================

@router.post("/push")
def push_to_github(data: GitHubPushRequest):
    try:
        token = data.access_token

        headers = {
            "Authorization": f"token {token}",
            "Accept": "application/vnd.github.v3+json"
        }

        # 🔹 Step 1: Get user
        user_res = requests.get("https://api.github.com/user", headers=headers)

        if user_res.status_code != 200:
            raise HTTPException(status_code=400, detail=f"GitHub auth failed: {user_res.text}")

        username = user_res.json()["login"]

        # 🔹 Step 2: Create repo
        repo_res = requests.post(
            "https://api.github.com/user/repos",
            headers=headers,
            json={
                "name": data.repo_name,
                "private": False
            }
        )

        if repo_res.status_code not in [201]:
            raise HTTPException(status_code=400, detail=f"Repo creation failed: {repo_res.text}")

        # 🔹 Step 3: Upload files
        for file in data.files:
            encoded_content = base64.b64encode(file.content.encode()).decode()

            file_url = f"https://api.github.com/repos/{username}/{data.repo_name}/contents/{file.path}"

            file_res = requests.put(
                file_url,
                headers=headers,
                json={
                    "message": f"Add {file.path}",
                    "content": encoded_content
                }
            )

            if file_res.status_code not in [200, 201]:
                raise HTTPException(
                    status_code=400,
                    detail=f"File upload failed ({file.path}): {file_res.text}"
                )

        return {
            "status": "success",
            "repo": data.repo_name,
            "owner": username
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))