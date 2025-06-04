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

exports.menu = async (kyy, name, user_id) => {
	const text = `Hello ${name}! Here are the available commands you can use:`
	const options = {
		reply_markup: {
			inline_keyboard: [
				[
					{ text: 'Maker 🧩', callback_data: `maker-${user_id}` },
					{ text: 'Search 🌐', callback_data: `search-${user_id}` },
					{ text: 'Download 📥', callback_data: `downloader-${user_id}` }
				]
			]
		}
	}
	try {
		await kyy.editMessageText(text, options)
	} catch {
		await kyy.reply(text, options)
	}
}

exports.maker = async (kyy, user_id) => {
	const prefix = config.prefix
	const text = `Maker Menu:

❏ ${prefix}carbon
`
	await kyy.editMessageText(text, {
		reply_markup: {
			inline_keyboard: [
				[{ text: 'Back', callback_data: `menu-${user_id}` }]
			]
		}
	})
}

// Lakukan hal sama untuk downloader dan search:
exports.downloader = async (kyy, user_id) => {
	const prefix = config.prefix
	const text = `Downloader Menu:

❏ ${prefix}play query
❏ ${prefix}ytmp3 link
❏ ${prefix}ytmp4 link
❏ ${prefix}tiktok link
❏ ${prefix}gitclone link
❏ ${prefix}mediafire link
`
	await kyy.editMessageText(text, {
		reply_markup: {
			inline_keyboard: [
				[{ text: 'Back', callback_data: `menu-${user_id}` }]
			]
		}
	})
}

exports.search = async (kyy, user_id) => {
	const prefix = config.prefix
	const text = `Search Menu:

❏ ${prefix}pin query
`
	await kyy.editMessageText(text, {
		reply_markup: {
			inline_keyboard: [
				[{ text: 'Back', callback_data: `menu-${user_id}` }]
			]
		}
	})
}

// GTW MAU NULIS AP
exports.messageError = async(kyy) => {
    await kyy.reply(`Error! Please report to the [${config.owner}](${config.ownerLink}) about this`, { parse_mode: "Markdown", disable_web_page_preview: true })
}