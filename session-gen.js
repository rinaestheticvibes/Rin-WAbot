const { default: makeWASocket, useSingleFileAuthState } = require('@whiskeysockets/baileys');
const fs = require('fs');

async function generateSession() {
    const { state, saveState } = useSingleFileAuthState('./auth_info.json');
    const sock = makeWASocket({ auth: state, printQRInTerminal: true });

    sock.ev.on('creds.update', () => {
        saveState();
        const sessionString = fs.readFileSync('./auth_info.json', 'utf-8');
        fs.writeFileSync('session.txt', sessionString); // easy to copy
        console.log('\n✅ Session saved to session.txt');
    });
}

generateSession();
