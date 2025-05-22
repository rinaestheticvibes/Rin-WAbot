const express = require('express');
const app = express();
app.use(express.json());

// WhatsApp link with your number (EDIT THIS)
const YOUR_PHONE_NUMBER = "918787550589"; // Include country code
const WHATSAPP_LINK = `https://wa.me/${YOUR_PHONE_NUMBER}`;

// Simple command handler
const commands = {
  hello: "👋 Hello! How can I help?",
  menu: "📜 Menu:\n- !hello\n- !menu\n- !price",
  price: "💎 Diamond Prices:\n100 Dias: ₹200\n500 Dias: ₹1000"
};

app.get('/', (req, res) => {
  res.send(`
    <h1>WhatsApp Bot</h1>
    <p>Click to chat: <a href="${WHATSAPP_LINK}">Open WhatsApp</a></p>
    <p>Commands: ${Object.keys(commands).join(', ')}</p>
  `);
});

// Simulate receiving messages (for demo)
app.post('/webhook', (req, res) => {
  const message = req.body.message?.toLowerCase() || '';
  const reply = commands[message.replace('!', '')] || "❌ Unknown command";
  console.log(`Received: ${message} | Replying: ${reply}`);
  res.json({ reply });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Bot ready! Chat link: ${WHATSAPP_LINK}`);
  console.log(`Local: http://localhost:${PORT}`);
});
