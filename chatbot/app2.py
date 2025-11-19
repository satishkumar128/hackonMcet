from openai import OpenAI
import streamlit as st
from dotenv import load_dotenv
import os
import shelve

# Load .env (make sure you have OPENAI_API_KEY set there)
load_dotenv()

st.title("ChatGPT-like Chatbot Demo")

USER_AVATAR = "👤"
BOT_AVATAR = "🤖"

# Get API key from environment variable (do NOT hardcode your key)
api_key = os.getenv("OPENAI_API_KEY")

if not api_key:
    st.error(
        "OpenAI API key not found. Set OPENAI_API_KEY in your environment or in a .env file."
    )
    st.stop()

client = OpenAI(api_key=api_key)

# Ensure openai_model is initialized in session state
if "openai_model" not in st.session_state:
    st.session_state["openai_model"] = "gpt-3.5-turbo"

# Load chat history from shelve file
def load_chat_history():
    with shelve.open("chat_history") as db:
        return db.get("messages", [])


# Save chat history to shelve file
def save_chat_history(messages):
    with shelve.open("chat_history") as db:
        db["messages"] = messages


# Initialize or load chat history
if "messages" not in st.session_state:
    st.session_state.messages = load_chat_history()

# Sidebar with a button to delete chat history
with st.sidebar:
    if st.button("Delete Chat History"):
        st.session_state.messages = []
        save_chat_history([])

# Display chat messages
for message in st.session_state.messages:
    avatar = USER_AVATAR if message.get("role") == "user" else BOT_AVATAR
    with st.chat_message(message.get("role", "assistant"), avatar=avatar):
        st.markdown(message.get("content", ""))

# Main chat interface
if prompt := st.chat_input("How can I help?"):
    # Append user message
    st.session_state.messages.append({"role": "user", "content": prompt})
    with st.chat_message("user", avatar=USER_AVATAR):
        st.markdown(prompt)

    # Assistant reply (streaming)
    with st.chat_message("assistant", avatar=BOT_AVATAR):
        message_placeholder = st.empty()
        full_response = ""

        try:
            # Stream responses from the OpenAI client
            for response in client.chat.completions.create(
                model=st.session_state["openai_model"],
                messages=st.session_state["messages"],
                stream=True,
            ):
                # Defensive access: some chunks may not have content
                chunk = ""
                try:
                    chunk = response.choices[0].delta.content or ""
                except Exception:
                    chunk = ""
                full_response += chunk
                # show a live typing indicator
                message_placeholder.markdown(full_response + "▌")

            # Finalize message
            message_placeholder.markdown(full_response)
        except Exception as e:
            # Show error to user and log minimally
            st.error(f"Error from OpenAI API: {e}")
            full_response = f"[Error: {e}]"

    # Append assistant message to history and persist
    st.session_state.messages.append({"role": "assistant", "content": full_response})
    save_chat_history(st.session_state.messages)
