/**

    THANKS TO:
	  - IkyyKzy - My Self
	  - Eriza - Online Friends
	  - Arraffi - Online Friends
	  - My Parents
	  - Lol Human - Based

	SPECIAL THANKS TO:
	  - Lol Human 
	  - PutraOffc - Supporter
	  - Ikmal - My Friends
	  - And All Creators

**/

const { fetchJson, range, parseMarkdown } = require('./lib/function')
const { Telegraf, Context } = require('telegraf')
const help = require('./lib/help')
const tele = require('./lib/tele')
const axios = require('axios')
const chalk = require('chalk')
const os = require('os')
const fs = require('fs')
const yts = require("yt-search")

const { botname, bot_token, owner, ownerLink, version, prefix } = JSON.parse(fs.readFileSync(`./config.json`))

let entertainment = {}

if (bot_token == '') {
	return console.log('=== BOT TOKEN CANNOT BE EMPTY ===')
}

const bot = new Telegraf(bot_token)

bot.command('start', async (kyy) => {
	user = tele.getUser(kyy.message.from)
	await help.start(kyy, user.full_name)
})

bot.command('menu', async (kyy) => {
	user = tele.getUser(kyy.message.from)
	await help.menu(kyy, user.full_name, kyy.message.from.id.toString())
})

bot.on('callback_query', async (kyy) => {
	cb_data = kyy.callbackQuery.data.split('-')
	user_id = Number(cb_data[1])
	if (kyy.callbackQuery.from.id != user_id) return kyy.answerCbQuery('Sorry, You do not have the right to access this button.', { show_alert: true })
	callback_data = cb_data[0]
	user = tele.getUser(kyy.callbackQuery.from)
	const isGroup = kyy.chat.type.includes('group')
	const groupName = isGroup ? kyy.chat.title : ''
	if (!isGroup) console.log(chalk.whiteBright('├'), chalk.cyanBright('[ ACTIONS ]'), chalk.whiteBright(callback_data), chalk.greenBright('from'), chalk.whiteBright(user.full_name))
	if (isGroup) console.log(chalk.whiteBright('├'), chalk.cyanBright('[ ACTIONS ]'), chalk.whiteBright(callback_data), chalk.greenBright('from'), chalk.whiteBright(user.full_name), chalk.greenBright('in'), chalk.whiteBright(groupName))
	if (callback_data == 'help') return await help[callback_data](kyy, user.full_name, user_id)
	await help[callback_data](kyy, user_id.toString())
})

bot.on('message', async (kyy, m, chatUpdate, store) => {
	try {
		const body = kyy.message.text || kyy.message.caption || ''
		comm = body.trim().split(' ').shift().toLowerCase()
		cmd = false
		if (prefix != '' && body.startsWith(prefix)) {
			cmd = true
			comm = body.slice(1).trim().split(' ').shift().toLowerCase()
		}

async function appenTextMessage(text, chatUpdate) {
let messages = await generateWAMessage(m.chat, { text: text, mentions: m.mentionedJid }, {
userJid: kyy.user.id,
quoted: m.quoted && m.quoted.fakeObj
})
messages.key.fromMe = areJidsSameUser(m.sender, kyy.user.id)
messages.key.id = m.key.id
messages.pushName = m.pushName
if (m.isGroup) messages.participant = m.sender
let msg = {
...chatUpdate,
messages: [proto.WebMessageInfo.fromObject(messages)],
type: 'append'}
kyy.ev.emit('messages.upsert', msg)}

		const command = comm
		const args = await tele.getArgs(kyy)
		const user = tele.getUser(kyy.message.from)
		const text = q = args.join(" ")
		const quoted = m.quoted ? m.quoted : m
		const mime = (quoted.msg || quoted).mimetype || ''

		const reply = async (text) => {
			for (var x of range(0, text.length, 4096)) {
				return await kyy.replyWithMarkdown(text.substr(x, 4096), { disable_web_page_preview: true })
			}
		}

		if (entertainment[kyy.update.message.from.id] && entertainment[kyy.update.message.from.id] === kyy.update.message.text.toLowerCase()) {
			delete entertainment[kyy.update.message.from.id]
			return reply('Jawaban Anda benar.')
		}

		const isCmd = cmd
		const isGroup = kyy.chat.type.includes('group')
		const groupName = isGroup ? kyy.chat.title : ''

		const isImage = kyy.message.hasOwnProperty('photo')
		const isVideo = kyy.message.hasOwnProperty('video')
		const isAudio = kyy.message.hasOwnProperty('audio')
		const isSticker = kyy.message.hasOwnProperty('sticker')
		const isContact = kyy.message.hasOwnProperty('contact')
		const isLocation = kyy.message.hasOwnProperty('location')
		const isDocument = kyy.message.hasOwnProperty('document')
		const isAnimation = kyy.message.hasOwnProperty('animation')
		const isMedia = isImage || isVideo || isAudio || isSticker || isContact || isLocation || isDocument || isAnimation

		const quotedMessage = kyy.message.reply_to_message || {}
		const isQuotedImage = quotedMessage.hasOwnProperty('photo')
		const isQuotedVideo = quotedMessage.hasOwnProperty('video')
		const isQuotedAudio = quotedMessage.hasOwnProperty('audio')
		const isQuotedSticker = quotedMessage.hasOwnProperty('sticker')
		const isQuotedContact = quotedMessage.hasOwnProperty('contact')
		const isQuotedLocation = quotedMessage.hasOwnProperty('location')
		const isQuotedDocument = quotedMessage.hasOwnProperty('document')
		const isQuotedAnimation = quotedMessage.hasOwnProperty('animation')
		const isQuoted = kyy.message.hasOwnProperty('reply_to_message')

		var typeMessage = body.substr(0, 50).replace(/\n/g, '')
		if (isImage) typeMessage = 'Image'
		else if (isVideo) typeMessage = 'Video'
		else if (isAudio) typeMessage = 'Audio'
		else if (isSticker) typeMessage = 'Sticker'
		else if (isContact) typeMessage = 'Contact'
		else if (isLocation) typeMessage = 'Location'
		else if (isDocument) typeMessage = 'Document'
		else if (isAnimation) typeMessage = 'Animation'

		if (!isGroup && !isCmd) console.log(chalk.whiteBright('├'), chalk.cyanBright('[ PRIVATE ]'), chalk.whiteBright(typeMessage), chalk.greenBright('from'), chalk.whiteBright(user.full_name))
		if (isGroup && !isCmd) console.log(chalk.whiteBright('├'), chalk.cyanBright('[  GROUP  ]'), chalk.whiteBright(typeMessage), chalk.greenBright('from'), chalk.whiteBright(user.full_name), chalk.greenBright('in'), chalk.whiteBright(groupName))
		if (!isGroup && isCmd) console.log(chalk.whiteBright('├'), chalk.cyanBright('[ COMMAND ]'), chalk.whiteBright(typeMessage), chalk.greenBright('from'), chalk.whiteBright(user.full_name))
		if (isGroup && isCmd) console.log(chalk.whiteBright('├'), chalk.cyanBright('[ COMMAND ]'), chalk.whiteBright(typeMessage), chalk.greenBright('from'), chalk.whiteBright(user.full_name), chalk.greenBright('in'), chalk.whiteBright(groupName))

		var file_id = ''
		if (isQuoted) {
			file_id = isQuotedImage
				? kyy.message.reply_to_message.photo[kyy.message.reply_to_message.photo.length - 1].file_id
				: isQuotedVideo
				? kyy.message.reply_to_message.video.file_id
				: isQuotedAudio
				? kyy.message.reply_to_message.audio.file_id
				: isQuotedDocument
				? kyy.message.reply_to_message.document.file_id
				: isQuotedAnimation
				? kyy.message.reply_to_message.animation.file_id
				: ''
		}
		var mediaLink = file_id != '' ? await tele.getLink(file_id) : ''

switch (command) {
case 'menu':
await help.help(kyy, user.full_name, kyy.message.from.id.toString())
break

case  'yts': case 'ytsearch': {
if (!text) return reply(`Example : ${prefix + command} Drunk Text`)
let convert = await yts({ search: text, hl: "id", gl: "ID" });
if (convert === 0) {
return reply("Lagu Kamu Cari Tidak Di Temukan Sayang, Coba Cari Judul Lain...");
}
let result = convert.all[0];
	let lily = `*YOUTUBE PLAY*\n`;
        lily += `*Judul*: ${result.title}\n`;
        lily += `*Id*: ${result.videoId}\n`;
        lily += `*Durasi*: ${result.timestamp}\n`;
        lily += `*Upload*: ${result.ago}\n`;
        lily += `*Deskripsi*: ${result.description}\n\n`;
        lily += `*URL*: ${result.url}\n\n`;
        lily += `**Masukan Command .audio/video linknya\n`;

await kyy.replyWithPhoto({ url: result.image }, { caption: lily })
}
break

case 'tiktok':
case 'tt': {
if (!text) {
  let input = `[!] *wrong input*\nEx : ${prefix + command} https://vt.tiktok.com/ZSFSqcuXb/`;
  return reply(input);
}
if (!(text.includes("http://") || text.includes("https://"))) {
  return reply(`url invalid, please input a valid url. Try with add http:// or https://`);
}
if (!text.includes("tiktok.com")) {
  return reply(`Invalid Tiktok URL.`);
}

async function tiktokDl(url) {
  return new Promise(async (resolve, reject) => {
    try {
      let data = [];
      function formatNumber(integer) {
        let numb = parseInt(integer);
        return Number(numb).toLocaleString().replace(/,/g, ".");
      }
      function formatDate(n, locale = "en") {
        let d = new Date(n);
        return d.toLocaleDateString(locale, {
          weekday: "long",
          day: "numeric",
          month: "long",
          year: "numeric",
          hour: "numeric",
          minute: "numeric",
          second: "numeric",
        });
      }
      let domain = "https://www.tikwm.com/api/";
      let res = await (
        await axios.post(
          domain,
          {},
          {
            headers: {
              Accept: "application/json, text/javascript, */*; q=0.01",
              "Accept-Language": "id-ID,id;q=0.9,en-US;q=0.8,en;q=0.7",
              "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
              Origin: "https://www.tikwm.com",
              Referer: "https://www.tikwm.com/",
              "Sec-Ch-Ua": '"Not)A;Brand" ;v="24" , "Chromium" ;v="116"',
              "Sec-Ch-Ua-Mobile": "?1",
              "Sec-Ch-Ua-Platform": "Android",
              "Sec-Fetch-Dest": "empty",
              "Sec-Fetch-Mode": "cors",
              "Sec-Fetch-Site": "same-origin",
              "User-Agent":
                "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Mobile Safari/537.36",
              "X-Requested-With": "XMLHttpRequest",
            },
            params: {
              url: url,
              count: 12,
              cursor: 0,
              web: 1,
              hd: 1,
            },
          }
        )
      ).data.data;
      if (res && !res.size && !res.wm_size && !res.hd_size) {
        res.images.map((v) => {
          data.push({ type: "photo", url: v });
        });
      } else {
        if (res && res.wmplay) {
          data.push({
            type: "watermark",
            url: "https://www.tikwm.com" + res.wmplay,
          });
        }
        if (res && res.play) {
          data.push({
            type: "nowatermark",
            url: "https://www.tikwm.com" + res.play,
          });
        }
        if (res && res.hdplay) {
          data.push({
            type: "nowatermark_hd",
            url: "https://www.tikwm.com" + res.hdplay,
          });
        }
      }
      let json = {
        status: true,
        title: res.title,
        taken_at: formatDate(res.create_time).replace("1970", ""),
        region: res.region,
        id: res.id,
        durations: res.duration,
        duration: res.duration + " Seconds",
        cover: "https://www.tikwm.com" + res.cover,
        size_wm: res.wm_size,
        size_nowm: res.size,
        size_nowm_hd: res.hd_size,
        data: data,
        music_info: {
          id: res.music_info.id,
          title: res.music_info.title,
          author: res.music_info.author,
          album: res.music_info.album ? res.music_info.album : null,
          url: "https://www.tikwm.com" + res.music || res.music_info.play,
        },
        stats: {
          views: formatNumber(res.play_count),
          likes: formatNumber(res.digg_count),
          comment: formatNumber(res.comment_count),
          share: formatNumber(res.share_count),
          download: formatNumber(res.download_count),
        },
        author: {
          id: res.author.id,
          fullname: res.author.unique_id,
          nickname: res.author.nickname,
          avatar: "https://www.tikwm.com" + res.author.avatar,
        },
      };
      resolve(json);
    } catch (e) {
      reject(e);
    }
  });
}

let down = await tiktokDl(text);

let berak = `[ *TIKTOK DOWNLOADER* ]

Videos:
Judul: ${down.title}
Server: ${down.region}
ID: ${down.id}
Durasi: ${down.duration}
Size: ${down.size_nowm_hd}

Music Info:
ID: ${down.music_info.id}
Judul: ${down.music_info.title}
Pemilik Musik: ${down.music_info.author}

Stats: 
Views: ${down.stats.views}
Likes: ${down.stats.likes}
Comment: ${down.stats.comment}
Share: ${down.stats.share}
Download: ${down.stats.download}

Author: 
ID: ${down.author.id}
Full Name: ${down.author.fullname}
Nickname: ${down.author.nickname}
Avatar: ${down.author.avatar}
`;

// Telegram max file size for bots is 50MB (50 * 1024 * 1024 bytes)
const MAX_FILE_SIZE = 50 * 1024 * 1024;

if (down.size_nowm_hd && down.size_nowm_hd > MAX_FILE_SIZE) {
  await kyy.reply(`Video size (${(down.size_nowm_hd / (1024 * 1024)).toFixed(2)} MB) exceeds Telegram limit. Please download it here: ${down.data[2].url}`);
} else {
  await kyy.replyWithVideo({ url: down.data[2].url }, { caption: berak });
}

if (down.music_info && down.music_info.url) {
  // For audio, size info is not always available, so we send directly
  await kyy.replyWithAudio({ url: down.music_info.url, filename: down.music_info.title });
}

};
break

case "ytmp4":
case "video":{
const downloadMp4 = async (Link) => {
try {
const { data: result } = await axios.get(`https://api.siputzx.my.id/api/d/ytmp4?url=${Link}`);
if (result.status && result.data.dl) {
await kyy.replyWithVideo({ url: result.data.dl })
} else {
throw new Error(result.message);
}
} catch (err) {
reply("Waduh, videonya ga bisa di-download... Coba lagi nanti");
console.error(err);
}
};

if (!text) return reply("masukan linknya");
reply('tunggu bentar gan')
await downloadMp4(text);
}
break;

case "ytmp3":
case "audio":{
const downloadMp3 = async (link) => {
try {
const { data: result } = await axios.get(`https://api.siputzx.my.id/api/d/ytmp3?url=${link}`);
if (result.status && result.data.dl || result.data.title) {
await kyy.replyWithAudio({ url: result.data.dl, filename: result.data.title })
// fs.unlinkSync(result.download);
} else {
throw new Error(result.message);
}
} catch (err) {
reply("Terjadi Kesalahan Saat Mengirim Audio.");
console.error(err);
}
};

if (!text) return reply("masukan linknya");
reply('tunggu bentar gan')
await downloadMp3(text);
}
break;

// DISINI BATAS AKHIR CASE
		}
	} catch (e) {
		console.log(chalk.whiteBright('├'), chalk.cyanBright('[  ERROR  ]'), chalk.redBright(e))
	}
})

bot.launch({
	dropPendingUpdates: true,
})
bot.telegram.getMe().then((getme) => {
	itsPrefix = prefix != '' ? prefix : 'No Prefix'
	console.log(chalk.greenBright(' ===================================================='))
	console.log(chalk.greenBright(' │ + Owner    : ' + owner || ''))
	console.log(chalk.greenBright(' │ + Bot Name : ' + getme.first_name || ''))
	console.log(chalk.greenBright(' │ + Version  : ' + version || ''))
	console.log(chalk.greenBright(' │ + Host     : ' + os.hostname() || ''))
	console.log(chalk.greenBright(' │ + Platfrom : ' + os.platform() || ''))
	console.log(chalk.greenBright(' │ + Prefix   : ' + itsPrefix))
	console.log(chalk.greenBright(' ===================================================='))
	console.log(chalk.whiteBright('╭─── [ LOG ]'))
})
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))

let file = require.resolve(__filename)
fs.watchFile(file, () => {
fs.unwatchFile(file)
console.log(chalk.redBright(`Update ${__filename}`))
delete require.cache[file]
require(file)
})