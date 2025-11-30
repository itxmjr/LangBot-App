import streamlit as st
import requests

API_URL = "http://localhost:8000/api/v1/chat/invoke"

def get_response(user_input):
    try:
        response = requests.post(
            API_URL,
            json={"input": {"question": user_input}},
            timeout=60
        )

        if response.status_code == 200:
            return response.json().get("output", "No output returned.")
        else:
            return f"Backend Error: {response.status_code}"
    except Exception as e:
        return f"Request Failed: {e}"


# Streamlit Framework:

st.title("LangBot — Your AI Assistant 🤖")

if "messages" not in st.session_state:
    st.session_state["messages"] = []

for msg in st.session_state["messages"]:
    with st.chat_message(msg["role"]):
        st.write(msg["content"])

user_input = st.chat_input("Ask anything...")

if user_input:
    st.session_state["messages"].append({"role": "user", "content": user_input})

    with st.chat_message("user"):
        st.write(user_input)

    with st.chat_message("assistant"):
        with st.spinner("Thinking..."):
            reply = get_response(user_input)
            st.write(reply)

    st.session_state["messages"].append({"role": "assistant", "content": reply})