async function handleMessage(sock, msg) {
    const from = msg.key.remoteJid;
    const message = msg.message.conversation || 
                    msg.message.extendedTextMessage?.text || '';

    if (message.toLowerCase() === 'hi') {
        await sock.sendMessage(from, { text: 'Hello! I am your bot.' });
    } else if (message.toLowerCase().startsWith('echo ')) {
        await sock.sendMessage(from, { text: message.slice(5) });
    } else {
        await sock.sendMessage(from, { text: "Sorry, I didn't understand." });
    }
}

module.exports = { handleMessage };
