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
const https = require('https')

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
    try {
        const [callback_data, payload] = kyy.callbackQuery.data.split('|')
        const from_id = kyy.callbackQuery.from.id

        if (callback_data === 'audio' || callback_data === 'video') {
            await kyy.answerCbQuery(`Mengunduh ${callback_data.toUpperCase()}...`, { show_alert: false });

            const url = payload;

            if (callback_data === 'audio') {
                const { data: result } = await axios.get(`https://api.siputzx.my.id/api/d/ytmp3?url=${url}`);
                if (result.status && result.data.dl) {
                    // Hapus tombol AUDIO, sisakan VIDEO
                    await kyy.editMessageReplyMarkup({
                        inline_keyboard: [[
                            { text: 'VIDEO', callback_data: `video|${url}` }
                        ]]
                    });
                    await kyy.replyWithAudio({ url: result.data.dl, filename: result.data.title });
                }
            } else if (callback_data === 'video') {
                const { data: result } = await axios.get(`https://api.siputzx.my.id/api/d/ytmp4?url=${url}`);
                if (result.status && result.data.dl) {
                    // Hapus semua tombol
                    await kyy.editMessageReplyMarkup({ inline_keyboard: [] });
                    await kyy.replyWithVideo({ url: result.data.dl });
                }
            }

            return;
        }

        // Handler lainnya tetap
        const [command_name, user_id_str] = kyy.callbackQuery.data.split('-')
        const user_id = Number(user_id_str)
        if (from_id !== user_id) {
            return kyy.answerCbQuery('❌ You are not allowed to use this button.', { show_alert: true })
        }

        const user = tele.getUser(kyy.callbackQuery.from)
        if (command_name === 'help') {
            return await help[command_name](kyy, user.full_name, user_id)
        }
        await help[command_name](kyy, user_id)
    } catch (err) {
        console.error('Callback error:', err)
        await kyy.answerCbQuery('An error occurred.', { show_alert: true })
    }
});

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


//BATAS AKHIR

//ini fitur case
switch (command) {
case 'menu':
await help.help(kyy, user.full_name, kyy.message.from.id.toString())
break

case 'song':
case 'play': {
    if (!text) return reply(`Example : ${prefix + command} Drunk Text`);
    
    let convert = await yts({ search: text, hl: "id", gl: "ID" });
    if (convert.all.length === 0) {
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
    lily += `Klik Button Dibawah Untuk Mendownload\n`;

    await kyy.replyWithPhoto({ url: result.image }, {
    caption: lily,
    parse_mode: "Markdown",
    reply_markup: {
        inline_keyboard: [[
            { text: 'AUDIO', callback_data: `audio|${result.url}` },
            { text: 'VIDEO', callback_data: `video|${result.url}` }
        ]]
    }
});
    break;
}

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

case 'pin' :
case 'pinterest': {
const agent = new https.Agent({
 rejectUnauthorized: true,
 maxVersion: 'TLSv1.3',
 minVersion: 'TLSv1.2'
});

async function getCookies() {
 try {
 const response = await axios.get('https://www.pinterest.com/csrf_error/', { httpsAgent: agent });
 const setCookieHeaders = response.headers['set-cookie'];
 if (setCookieHeaders) {
 const cookies = setCookieHeaders.map(cookieString => {
 const cookieParts = cookieString.split(';');
 return cookieParts[0].trim();
 });
 return cookies.join('; ');
 }
 return null;
 } catch {
 return null;
 }
}

async function pinterest(query) {
 try {
 const cookies = await getCookies();
 if (!cookies) return [];

 const url = 'https://www.pinterest.com/resource/BaseSearchResource/get/';
 const params = {
 source_url: `/search/pins/?q=${query}`,
 data: JSON.stringify({
 options: {
 isPrefetch: false,
 query: query,
 scope: "pins",
 no_fetch_context_on_resource: false
 },
 context: {}
 }),
 _: Date.now()
 };

 const headers = {
 'accept': 'application/json, text/javascript, */*, q=0.01',
 'accept-encoding': 'gzip, deflate',
 'accept-language': 'en-US,en;q=0.9',
 'cookie': cookies,
 'dnt': '1',
 'referer': 'https://www.pinterest.com/',
 'sec-ch-ua': '"Not(A:Brand";v="99", "Microsoft Edge";v="133", "Chromium";v="133"',
 'sec-ch-ua-full-version-list': '"Not(A:Brand";v="99.0.0.0", "Microsoft Edge";v="133.0.3065.92", "Chromium";v="133.0.6943.142"',
 'sec-ch-ua-mobile': '?0',
 'sec-ch-ua-model': '""',
 'sec-ch-ua-platform': '"Windows"',
 'sec-ch-ua-platform-version': '"10.0.0"',
 'sec-fetch-dest': 'empty',
 'sec-fetch-mode': 'cors',
 'sec-fetch-site': 'same-origin',
 'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/133.0.0.0 Safari/537.36 Edg/133.0.0.0',
 'x-app-version': 'c056fb7',
 'x-pinterest-appstate': 'active',
 'x-pinterest-pws-handler': 'www/[username]/[slug].js',
 'x-pinterest-source-url': '/hargr003/cat-pictures/',
 'x-requested-with': 'XMLHttpRequest'
 };

 const { data } = await axios.get(url, { httpsAgent: agent, headers, params });
 return data.resource_response.data.results
 .filter(v => v.images?.orig)
 .map(result => ({
 upload_by: result.pinner.username,
 fullname: result.pinner.full_name,
 followers: result.pinner.follower_count,
 caption: result.grid_title,
 image: result.images.orig.url,
 source: "https://id.pinterest.com/pin/" + result.id,
 }));
 } catch {
 return [];
 }
}

 if (!text) return reply(`*Penggunaan:* ${prefix + command} <query> <jumlah>\n\n*Contoh:* ${prefix + command} anime 3`);
 
 let [query, count] = text.split(' ');
 let imgCount = 5;

 if (text.indexOf(' ') !== -1) {
 const lastWord = text.split(' ').pop();
 if (!isNaN(lastWord) && lastWord.trim() !== '') {
 imgCount = parseInt(lastWord);
 query = text.substring(0, text.lastIndexOf(' '));
 } else {
 query = text;
 }
 } else {
 query = text;
 }
 
 reply('Searching Pinterest images...');
 
 try {
 const results = await pinterest(query);
 if (results.length === 0) return reply(`No results found for "${query}". Try another search term.`);
 
 const imagesToSend = Math.min(results.length, imgCount);
 reply(`Sending ${imagesToSend} Pinterest images for "${query}"...`);
 
 for (let i = 0; i < imagesToSend; i++) {
 await kyy.replyWithPhoto({ url: `${results[i].image}` }, { caption: `Result From: ${text}` })
 }
 } catch {
 reply('Error occurred while fetching Pinterest images. Please try again later.');
 }
}
break

case 'mediafire':
case 'mf': {
    if (!text) return reply(`Masukkan link Mediafire-nya!\nContoh: ${prefix + command} https://www.mediafire.com/file/xxxx`);
    reply('Tunggu sebentar, sedang diproses...');

    try {
        const res = await axios.get(`https://api.siputzx.my.id/api/d/mediafire?url=${encodeURIComponent(text)}`);
        const json = res.data;

        if (!json.status || !json.data) return reply('Gagal mengambil data dari Mediafire.');

        const {
            fileName,
            fileSize,
            fileType,
            mimeType,
            fileExtension,
            uploadDate,
            compatibility,
            description,
            downloadLink
        } = json.data;

        const caption = `*「 MEDIAFIRE DOWNLOADER 」*\n\n` +
        `*Nama File:* ${fileName}\n` +
        `*Ukuran:* ${fileSize}\n` +
        `*Tipe:* ${fileType} (${fileExtension})\n` +
        `*Mime:* ${mimeType}\n` +
        `*Kompatibilitas:* ${compatibility}\n` +
        `*Upload Date:* ${uploadDate}\n` +
        `*Deskripsi:* ${description}`;

        await kyy.replyWithDocument(
            { url: downloadLink, filename: fileName, contentType: mimeType },
            { caption, parse_mode: "Markdown" }
        );
    } catch (err) {
        console.error(err);
        reply('Terjadi kesalahan saat memproses link.');
    }
    break;
}

case 'gitclone': {
    if (!text) return reply(`⚠️ Gunakan dengan cara:\n${prefix}gitclone <url>\n\nContoh:\n${prefix}gitclone https://github.com/user/repo`);

    const regx = /(?:https|git)(?::\/\/|@)github\.com[\/:]([^\/:]+)\/(.+)/i;

    if (!regx.test(text)) return reply("❌ Link GitHub tidak valid.");

    await kyy.reply("⏱️ Sedang memproses...");

    try {
        let [, usr, repo] = text.match(regx) || [];
        let repos = repo.replace(/.git$/, '');
        let downloadUrl = `https://api.github.com/repos/${usr}/${repos}/zipball`;

        // Ambil nama file dari header Content-Disposition
        const response = await fetch(downloadUrl, { method: 'HEAD' });
        const disposition = response.headers.get('content-disposition');
        const match = disposition && disposition.match(/attachment; filename="?(.+?)"?$/);
        const filename = match ? match[1] : `${repos}.zip`;

        await kyy.replyWithDocument({ url: downloadUrl, filename }, {
            caption: `✅ Repository berhasil di-clone:\n*${usr}/${repos}*`,
            parse_mode: "Markdown"
        });
    } catch (err) {
        console.error('GitClone error:', err.message);
        return reply("❌ Gagal mengunduh repository.");
    }

    break;
}

case 'carbon': {
    if (!text) return reply(`❌ Masukkan teks yang ingin diubah menjadi gambar kode.\n\nContoh: ${prefix + command} console.log("hello world")`);
    try {
        const encodedText = encodeURIComponent(text);
        const imageUrl = `https://api.siputzx.my.id/api/m/carbonify?input=${encodedText}`;

        await kyy.replyWithPhoto({ url: imageUrl }, {
            caption: `✅ Selesai, berikut hasil carbon-nya.`,
            parse_mode: "Markdown"
        });
    } catch (err) {
        console.error('Carbon error:', err);
        return reply('❌ Terjadi kesalahan saat memproses permintaan. Coba lagi nanti.');
    }
    break;
}

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