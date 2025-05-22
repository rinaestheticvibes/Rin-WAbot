# WhatsApp Bot with QR Linking

A bot that generates a QR code to link with WhatsApp Web.

## 🛠 Setup
1. Install dependencies:
   ```bash
   npm install
   ```

2. Run the bot:
   ```bash
   npm start
   ```

3. Scan the QR code with WhatsApp Mobile:
   - Open WhatsApp → Settings → Linked Devices → Link a Device

## 🌐 Deploy to Replit
1. Import this repo to Replit
2. Click "Run"
3. Scan the QR from:
   - Replit webpage (image QR) **OR**
   - Replit console (terminal QR)

## 🔄 Session Persistence
- After first scan, the bot will auto-login
- Session data is saved in `./.wwebjs_auth`
