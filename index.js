import { uploadPhotoId,updatePhotos,getPhotoIds,getPhotos } from './functions.js'
import {Telegraf} from 'telegraf';


const API_TOKEN = process.env.API_TOKEN || '1482357475:AAF9n2KgWUNwge6CI9JiH4anLfSHyPLUWRc';
const PORT = process.env.PORT || 5000;
const URL = process.env.URL || 'https://hellogreeting.herokuapp.com';
const bot = new Telegraf(API_TOKEN);
//bot.telegram.setWebhook(`${URL}/bot${API_TOKEN}`);
//bot.startWebhook(`/bot${API_TOKEN}`, null, PORT)

const chatId=647015353;

bot.start(ctx=>{
  ctx.reply("hello")
})

bot.on('photo', ctx=>{
  const name = ctx.message.from.first_name;
  const msgId = ctx.message.message_id;
  var photoId = {
    low : ctx.message.photo[0].file_id,
    high : ctx.message.photo[ctx.message.photo.length-1].file_id,
  }
  uploadPhotoId(name,msgId,photoId)
})

bot.command('update',async ctx=>{
  const name = "Shreedhar malashetti"
  ctx.reply('updating')
  const ids = await getPhotoIds(name)
  
  const photos = await getPhotos(ctx,ids)
 // console.log(photos)
  updatePhotos(name,photos);
  ctx.reply('updated')
})

bot.launch()
/*bot.on('document',ctx=>{
  console.log(ctx.message)
})

bot.command('f',ctx=>{
  var toId=chatId;
  var fromId="-1001326018775";
  var msgId=2060;
    ctx.telegram.forwardMessage(toId,-1001165649763,msgId)
})

*/


 //Enable graceful stop 647015353

//process.once('SIGINT', () => bot.stop('SIGINT'))
//process.once('SIGTERM', () => bot.stop('SIGTERM'))


