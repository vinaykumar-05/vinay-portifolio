
import streamlit as st
import json
import time

# Load portfolio data
with open("vinay_data.json") as f:
    data = json.load(f)

# Page config
st.set_page_config(page_title="Vinay's Portfolio", page_icon="💼", layout="wide")

# Animations for smooth UI
def typewriter(text):
    for char in text:
        st.write(char, end="")
        time.sleep(0.01)

# Header
st.markdown("<h1 style='text-align:center;'>💼 Vinay's Portfolio</h1>", unsafe_allow_html=True)
st.markdown("---")

# About section
st.subheader("👋 About Me")
st.write(data["about"])

# Skills
st.subheader("🛠 Skills")
st.write(", ".join(data["skills"]))

# Achievements
st.subheader("🏆 Achievements")
for ach in data["achievements"]:
    st.write(f"- {ach['title']} ({ach['year']})")

# Certificates
st.subheader("📜 Certificates")
for cert in data["certificates"]:
    st.write(f"- {cert['title']} — {cert['date']}")

# Contact
st.subheader("📬 Contact")
st.write(f"**Email:** {data['contact']['email']}")
st.write(f"**LinkedIn:** [Profile]({data['contact']['linkedin']})")
st.write(f"**GitHub:** [Profile]({data['contact']['github']})")

# Chatbot
st.markdown("---")
st.subheader("💬 Ask me anything about my portfolio")
if "messages" not in st.session_state:
    st.session_state.messages = []

query = st.text_input("You:")
if st.button("Send"):
    if query:
        # Simple chatbot logic
        response = "I couldn't find that in my portfolio."
        query_lower = query.lower()
        if "skill" in query_lower:
            response = "My skills are: " + ", ".join(data["skills"])
        elif "certificate" in query_lower:
            cert_list = [f"{c['title']} ({c['date']})" for c in data["certificates"]]
            response = "I have completed the following certificates: " + "; ".join(cert_list)
        elif "achievement" in query_lower:
            ach_list = [f"{a['title']} ({a['year']})" for a in data["achievements"]]
            response = "Some of my achievements include: " + "; ".join(ach_list)
        elif "about" in query_lower:
            response = data["about"]

        st.session_state.messages.append(("You", query))
        st.session_state.messages.append(("Bot", response))

for sender, msg in st.session_state.messages:
    if sender == "You":
        st.markdown(f"**{sender}:** {msg}")
    else:
        st.markdown(f"<p style='color:green;'><b>{sender}:</b> {msg}</p>", unsafe_allow_html=True)
