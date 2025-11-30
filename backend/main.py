import os
from dotenv import load_dotenv

load_dotenv()

from fastapi import FastAPI
from langserve import add_routes
from .chain import get_chain
import uvicorn

app = FastAPI(
    title="LangBot API",
    description="LangBot AI Backend",
    version="1.0.0"
)

add_routes(app, get_chain(), path="/api/v1/chat")

@app.get("/health")
def health():
    return {"status": "ok"}

# Run with: uvicorn backend.main:app --reload --port 8000