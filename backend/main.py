import os
from dotenv import load_dotenv

load_dotenv()

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from langserve import add_routes
from .chain import get_chain
import uvicorn

app = FastAPI(
    title="LangBot API",
    description="LangBot AI Backend",
    version="1.0.0"
)

# Allow CORS for development if frontend is served elsewhere
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

add_routes(app, get_chain(), path="/api/v1/chat")

@app.get("/health")
def health():
    return {"status": "ok"}

# Mount frontend
app.mount("/", StaticFiles(directory="frontend", html=True), name="frontend")

# Run with: uvicorn backend.main:app --reload --port 8000