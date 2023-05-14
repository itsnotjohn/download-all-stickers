(async () => {
    const config = require('./config.json');
    const fs = require("fs");

    const response = await fetch(`https://discord.com/api/guilds/${config.guildId}`, {
        headers: {
            'Authorization': config.token,
            'Content-Type': 'application/json'
        }
    });

    const res = await response.json();
    const stickersInfo = res?.stickers;

    for (let i = 0; i < stickersInfo.length; i++) {
        const sticker = stickersInfo[i];
        const stickerURL = `https://media.discordapp.net/stickers/${sticker?.id}.png?size=2048`;

        const filePath = `${__dirname}/stickers/`;
        const attachmentPath = `${filePath}/${sticker?.name} (${sticker?.id}).png`;

        if (!fs.existsSync(filePath)) fs.mkdirSync('stickers');

        const response = await fetch(stickerURL);
        const buffer = Buffer.from(await response.arrayBuffer());

        fs.createWriteStream(attachmentPath).write(buffer);
        console.log(`Figurinha baixada: ${sticker?.name} (${sticker?.id})`);
    }
})();
