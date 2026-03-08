# 🤖 LangBot — Premium LLM Assistant

[![FastAPI](https://img.shields.io/badge/FastAPI-005571?style=for-the-badge&logo=fastapi)](https://fastapi.tiangolo.com/)
[![LangChain](https://img.shields.io/badge/LangChain-1C3C3C?style=for-the-badge&logo=langchain)](https://www.langchain.com/)
[![Ollama](https://img.shields.io/badge/Ollama-black?style=for-the-badge&logo=ollama)](https://ollama.com/)
[![Vanilla JS](https://img.shields.io/badge/Vanilla_JS-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

LangBot is a state-of-the-art, privacy-focused AI assistant built with a **FastAPI** backend and a stunning **Glassmorphism** frontend. It leverages **LangChain** and **Ollama** to provide a seamless, local-first LLM experience without relying on external cloud APIs.

---

## ✨ Key Features

- 💎 **Modern Aesthetic**: A premium "Glassmorphism" UI with animated background orbs and smooth transitions.
- 🔒 **Privacy-First**: Powered by local LLMs via Ollama—your data never leaves your machine.
- ⚡ **High Performance**: Lightweight FastAPI backend serving as an integrated full-stack application.
- 🛠️ **Seamless Integration**: Built using the latest LangChain (LangServe) patterns for scalable AI orchestration.
- 📱 **Fully Responsive**: Optimized for desktop and mobile viewing.

---

## 🚀 Tech Stack

- **Frontend**: Custom HTML5, Vanilla CSS3 (Glassmorphism), Vanilla JavaScript.
- **Backend**: FastAPI (Python), Uvicorn.
- **AI Orchestration**: LangChain, LangServe.
- **LLM Engine**: Ollama (Local LLM Execution).
- **Dependency Management**: [uv](https://github.com/astral-sh/uv).

---

## 🛠️ Installation & Setup

### 1. Prerequisites
- [Python 3.11+](https://www.python.org/downloads/)
- [Ollama](https://ollama.com/)
- [uv](https://github.com/astral-sh/uv) (Recommended)

### 2. Prepare the LLM
Ensure Ollama is running and pull the model (defaulting to `phi3` or your configured `MODEL_NAME`):
```bash
ollama pull phi
```

### 3. Clone & Install
```bash
# Clone the repository
git clone https://github.com/yourusername/langbot-app.git
cd langbot-app

# Sync dependencies using uv
uv sync
```

---

## 🚥 Quick Start

Start the combined backend and frontend server:

```bash
uv run uvicorn backend.main:app --reload --port 8000
```

Open your browser and navigate to:
**[http://localhost:8000](http://localhost:8000)**

---

## 📂 Project Structure

```text
├── backend/
│   ├── chain.py        # LangChain LLM logic
│   └── main.py         # FastAPI routes & static file serving
├── frontend/
│   ├── index.html      # Glassmorphism structure
│   ├── style.css       # Premium UI styling
│   └── script.js       # Client-side logic & interaction
├── pyproject.toml      # Project dependencies
└── README.md           # You are here!
```

---

## 🎯 LinkedIn Showcase Tips

Captured a video or a GIF of the UI in action? The **glassmorphism effects** and **background animations** are excellent for showing off your full-stack and design skills alongside AI implementation.

---

## 📜 License

Distributed under the MIT License. See `LICENSE` for more information.

---

*Built with ❤️ for the AI Community.*
