from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import os

# ✅ LOAD ENV FILE (IMPORTANT)
load_dotenv()

from api.generate import router as generate_router
from api.auth import router as auth_router
from api.github import router as github_router

app = FastAPI()

# ✅ CORS (frontend connection)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ✅ ROUTES
app.include_router(generate_router)
app.include_router(auth_router, prefix="/auth")
app.include_router(github_router, prefix="/github")


@app.get("/")
def root():
    return {"message": "Bazinga backend running 🚀"}