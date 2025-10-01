import streamlit as st
import requests

st.set_page_config(page_title="Text Summarizer", page_icon="✂️")

st.title("📝 AI Text Summarizer")
st.write("Paste any text and get a concise summary.")

user_input = st.text_area("Enter your text here:")

if st.button("Summarize"):
    if user_input.strip():
        response = requests.post("http://127.0.0.1:8000/summarize", json={"text": user_input})
        if response.status_code == 200:
            summary = response.json()["summary"]
            st.subheader("📌 Summary:")
            st.success(summary)
        else:
            st.error("Something went wrong with the backend.")
    else:
        st.warning("Please enter some text first!")
