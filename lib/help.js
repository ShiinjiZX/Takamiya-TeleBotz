const fs = require('fs')
const config = JSON.parse(fs.readFileSync(`./config.json`))

exports.start = async(kyy, name, botname) => {
const photoUrl = "https://files.catbox.moe/ahku5l.jpg"; // Ganti dengan URL foto yang diinginkan
const text = `
Hello ${name}! Im a ${config.botname}, multifunction bot build with ❤.

use /menu to dispay menu bot
`
	await kyy.replyWithPhoto({ url: photoUrl }, { caption: text }, { disable_web_page_preview: true })
	await kyy.replyWithAudio({ url: 'https://files.catbox.moe/4hih0w.mp3', filename: 'bot lagu' }, { thumb: photoUrl })
};

exports.menu = async(kyy, name, user_id) => {
    text = `Hello ${name}! Here are the available commands you can use :`
    options = {
        reply_markup: {
            inline_keyboard: [
                [
                    { text: 'Example 💬', callback_data: 'example-' + user_id },
                    { text: 'Download 📥', callback_data: 'downloader-' + user_id }
                ],
            ]
        }
    }
    try {
        await kyy.editMessageText(text, options)
    } catch {
        await kyy.reply(text, options)
    }
}

exports.example = async(kyy, user_id) => {
    prefix = config.prefix
    text = `Example Menu :

❏ ${prefix}example
`
    await kyy.editMessageText(text, {
        reply_markup: {
            inline_keyboard: [
                [
                    { text: 'Back', callback_data: 'menu-' + user_id }
                ]
            ]
        }
    })
}

exports.downloader = async(kyy, user_id) => {
    prefix = config.prefix
    text = `Downloader Menu :

❏ ${prefix}ytsearch query
❏ ${prefix}ytmp3 link
❏ ${prefix}ytmp4 link
❏ ${prefix}tiktok link
`
    await kyy.editMessageText(text, {
        reply_markup: {
            inline_keyboard: [
                [
                    { text: 'Back', callback_data: 'menu-' + user_id }
                ]
            ]
        }
    })
}

exports.messageError = async(kyy) => {
    await kyy.reply(`Error! Please report to the [${config.owner}](${config.ownerLink}) about this`, { parse_mode: "Markdown", disable_web_page_preview: true })
}