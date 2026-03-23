from fastapi import APIRouter, HTTPException
from fastapi.responses import RedirectResponse
import requests
import os

router = APIRouter()

CLIENT_ID = os.getenv("GITHUB_CLIENT_ID")
CLIENT_SECRET = os.getenv("GITHUB_CLIENT_SECRET")


# =========================
# LOGIN
# =========================
@router.get("/github/login")
def github_login():
    if not CLIENT_ID:
        raise HTTPException(status_code=500, detail="GitHub Client ID not set")

    return RedirectResponse(
        f"https://github.com/login/oauth/authorize?client_id={CLIENT_ID}&scope=repo"
    )


# =========================
# CALLBACK
# =========================
@router.get("/github/callback")
def github_callback(code: str):
    if not CLIENT_ID or not CLIENT_SECRET:
        raise HTTPException(status_code=500, detail="GitHub credentials missing")

    try:
        response = requests.post(
            "https://github.com/login/oauth/access_token",
            headers={"Accept": "application/json"},
            data={
                "client_id": CLIENT_ID,
                "client_secret": CLIENT_SECRET,
                "code": code,
            },
        )

        data = response.json()
        access_token = data.get("access_token")

        # ❌ THIS IS WHY YOU GOT "FAILED"
        if not access_token:
            print("GitHub ERROR:", data)  # 👈 VERY IMPORTANT DEBUG
            raise HTTPException(status_code=400, detail="Failed to get token")

        # ✅ CORRECT REDIRECT
        return RedirectResponse(
            url=f"http://localhost:3000/callback?token={access_token}"
        )

    except Exception as e:
        print("OAuth Exception:", str(e))
        raise HTTPException(status_code=500, detail="OAuth failed")