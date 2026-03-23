import requests
import base64

GITHUB_API = "https://api.github.com"


# 🔐 Headers using user token
def get_headers(token: str):
    return {
        "Authorization": f"token {token}",
        "Accept": "application/vnd.github.v3+json"
    }


# 👤 Get user details (to get username dynamically)
def get_user(token: str):
    url = f"{GITHUB_API}/user"

    res = requests.get(url, headers=get_headers(token))

    if res.status_code != 200:
        raise Exception(f"Failed to fetch user: {res.json()}")

    return res.json()


# 📦 Create repository
def create_repo(repo_name: str, token: str, private: bool = False):
    url = f"{GITHUB_API}/user/repos"

    data = {
        "name": repo_name,
        "private": private,
        "auto_init": False
    }

    res = requests.post(url, json=data, headers=get_headers(token))

    if res.status_code != 201:
        raise Exception(f"Failed to create repo: {res.json()}")

    return res.json()


# 📄 Upload single file
def upload_file(repo_name: str, file_path: str, content: str, token: str, username: str):
    url = f"{GITHUB_API}/repos/{username}/{repo_name}/contents/{file_path}"

    encoded_content = base64.b64encode(content.encode()).decode()

    data = {
        "message": f"Add {file_path}",
        "content": encoded_content
    }

    res = requests.put(url, json=data, headers=get_headers(token))

    if res.status_code not in [200, 201]:
        raise Exception(f"Failed to upload {file_path}: {res.json()}")

    return res.json()


# 📂 Upload all files
def upload_files(repo_name: str, files: list, token: str, username: str):
    for file in files:
        upload_file(
            repo_name=repo_name,
            file_path=file["path"],
            content=file["content"],
            token=token,
            username=username
        )


# 🚀 Full pipeline
def create_repo_and_push(repo_name: str, files: list, token: str, private: bool = False):
    # 🔹 Step 1: Get user
    user = get_user(token)
    username = user["login"]

    # 🔹 Step 2: Create repo
    create_repo(repo_name, token, private)

    # 🔹 Step 3: Upload files
    upload_files(repo_name, files, token, username)

    return {
        "status": "success",
        "repo": repo_name,
        "owner": username
    }