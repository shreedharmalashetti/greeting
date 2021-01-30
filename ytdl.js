const fs = require('fs');
const ytdlCore = require('ytdl-core');


const ytdl =  async (ctx) => {
  const  arr = ctx.message.text.split(' ',3);
  if(arr[0] === '/ytdl' && arr[1] && arr[2]){
  const msg = await ctx.reply('video downloading.....');
  var stream =  ytdlCore(arr[1])
  .pipe( fs.createWriteStream('../youtube/'+arr[2]));
    
   stream.on('finish',()=>{
     ctx.telegram.editMessageText(msg.chat.id, msg.message_id,undefined,'download completed');  
     });
   }
   else{
    ctx.reply('incorrect format');
   }
  
}


module.exports = ytdl;