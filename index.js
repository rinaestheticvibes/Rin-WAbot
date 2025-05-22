const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const express = require('express');
const QRCode = require('qrcode');

const app = express();
const PORT = process.env.PORT || 3000;

// WhatsApp Client Setup
const client = new Client({
  authStrategy: new LocalAuth({
    dataPath: './.wwebjs_auth' // Explicit session storage
  }),
  puppeteer: {
    headless: true,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage'
    ]
  }
});

// QR Code Handling
let qrCodeUrl = '';
client.on('qr', async (qr) => {
  // 1. Show QR in terminal
  qrcode.generate(qr, { small: true });
  
  // 2. Generate URL for web display
  qrCodeUrl = await QRCode.toDataURL(qr);
  console.log(`QR code generated at: http://localhost:${PORT}`);
});

// Web Server
app.get('/', (req, res) => {
  if (qrCodeUrl) {
    res.send(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>Scan WhatsApp QR</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          body { 
            font-family: Arial, sans-serif; 
            text-align: center;
            padding: 20px;
          }
          img { 
            max-width: 300px; 
            margin: 20px auto;
            border: 1px solid #ddd;
            padding: 10px;
          }
          .instructions {
            background: #f5f5f5;
            padding: 15px;
            border-radius: 5px;
            max-width: 500px;
            margin: 20px auto;
          }
        </style>
      </head>
      <body>
        <h1>Scan WhatsApp QR Code</h1>
        <img src="${qrCodeUrl}" alt="WhatsApp QR Code"/>
        <div class="instructions">
          <h3>How to link:</h3>
          <ol>
            <li>Open WhatsApp on your phone</li>
            <li>Tap <strong>Settings → Linked Devices → Link a Device</strong></li>
            <li>Point your camera at this QR code</li>
          </ol>
        </div>
      </body>
      </html>
    `);
  } else {
    res.send(`
      <h1>Waiting for QR code...</h1>
      <p>Check your Replit/terminal logs for updates</p>
    `);
  }
});

// Bot Ready
client.on('ready', () => {
  console.log('✅ WhatsApp client is ready!');
});

// Message Handling
client.on('message', msg => {
  console.log(`Message from ${msg.from}: ${msg.body}`);
  
  // Simple commands
  if (msg.body === '!ping') msg.reply('🏓 pong');
  if (msg.body === '!menu') {
    msg.reply('📜 Menu:\n!ping\n!menu\n!hello');
  }
});

// Start
client.initialize();
app.listen(PORT, () => {
  console.log(`Web server running on http://localhost:${PORT}`);
  console.log('Waiting for QR code...');
});
