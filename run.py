import os
import sys
import time
import subprocess
import signal

# Paths
VENV_PYTHON = os.path.join(".venv", "Scripts" if os.name == "nt" else "bin", "python")

# Start backend
backend_cmd = [VENV_PYTHON, "-m", "uvicorn", "backend.main:app", "--reload", "--port", "8000"]
backend_proc = subprocess.Popen(backend_cmd)

# Wait a few seconds
time.sleep(5)

# Start frontend
frontend_cmd = [VENV_PYTHON, "-m", "streamlit", "run", "frontend/app.py"]
frontend_proc = subprocess.Popen(frontend_cmd)

# Wait for processes, allow Ctrl+C to exit
try:
    backend_proc.wait()
    frontend_proc.wait()
except KeyboardInterrupt:
    print("\nStopping backend and frontend...")
    backend_proc.send_signal(signal.SIGINT)
    frontend_proc.send_signal(signal.SIGINT)
    sys.exit(0)