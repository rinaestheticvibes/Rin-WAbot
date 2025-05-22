const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;

// WhatsApp Client Setup
const client = new Client({
  authStrategy: new LocalAuth(),
  puppeteer: { 
    args: ['--no-sandbox', '--disable-setuid-sandbox'] // Required for Replit
  }
});

// QR Code Generation
client.on('qr', qr => {
  console.log('Scan this QR to link your device:');
  qrcode.generate(qr, { small: true }); // Shows QR in terminal
  
  // Alternative: Generate a web page with QR (for Replit)
  app.get('/', (req, res) => {
    qrcode.toDataURL(qr, (err, qrUrl) => {
      res.send(`
        <h1>Scan QR to Link WhatsApp</h1>
        <img src="${qrUrl}" width="300"/>
        <p>Or check Replit logs for terminal QR</p>
      `);
    });
  });
});

// Bot Ready
client.on('ready', () => {
  console.log('✅ Client is ready!');
});

// Message Handling
client.on('message', msg => {
  const text = msg.body.toLowerCase() || '';
  
  // Simple Commands
  if (text === '!ping') msg.reply('🏓 pong');
  if (text === '!menu') msg.reply('📜 Menu:\n!ping\n!menu\n!hello');
  if (text === '!hello') msg.reply('👋 Hello from your bot!');
});

// Start
client.initialize();
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
