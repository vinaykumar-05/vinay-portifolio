import vinayData from './vinay_data.json' assert { type: 'json' };

const chatForm = document.getElementById('chat-form');
const chatBox = document.getElementById('chat-box');

function addMessage(sender, text) {
  const message = document.createElement('div');
  message.className = sender;
  message.innerText = text;
  chatBox.appendChild(message);
  chatBox.scrollTop = chatBox.scrollHeight;
}

function chatbotResponse(userInput) {
  const lower = userInput.toLowerCase();

  if (lower.includes("skill")) return vinayData.skills.join(", ");
  if (lower.includes("achievement")) return vinayData.achievements.join(", ");
  if (lower.includes("certificate")) return vinayData.certifications.map(c => `${c.name} (${c.year})`).join("\n");
  if (lower.includes("internship")) return vinayData.internships.map(i => `${i.title} at ${i.company} (${i.duration})`).join("\n");
  if (lower.includes("project")) return "Projects include: Portfolio Website, IoT Applications, GAN models.";
  
  return "I am Vinay's personal assistant. You can ask me about his skills, certifications, achievements, internships, or projects.";
}

chatForm.addEventListener('submit', e => {
  e.preventDefault();
  const userInput = document.getElementById('user-input').value;
  addMessage('user', userInput);
  const botReply = chatbotResponse(userInput);
  addMessage('bot', botReply);
  chatForm.reset();
});
