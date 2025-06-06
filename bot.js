const { default: makeWASocket, useSingleFileAuthState } = require('@whiskeysockets/baileys');
const fs = require('fs');
const { session } = require('./settings');

// Write session to temp file so Baileys can load it
const SESSION_PATH = './auth_info.json';
fs.writeFileSync(SESSION_PATH, session);

const { state, saveState } = useSingleFileAuthState(SESSION_PATH);

async function startBot() {
    const sock = makeWASocket({ auth: state });

    sock.ev.on('messages.upsert', async ({ messages }) => {
        const msg = messages[0];
        if (!msg.message || msg.key.fromMe) return;

        const text = msg.message.conversation || '';
        const from = msg.key.remoteJid;

        if (text.toLowerCase() === 'ping') {
            await sock.sendMessage(from, { text: 'Pong!' });
        }
    });

    sock.ev.on('creds.update', saveState);
}

startBot();
