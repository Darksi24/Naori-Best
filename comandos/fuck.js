const blacklist = [7978613098, 123466]

module.exports = {
	name: "fuck",
	execute: async (ctx) => {
     //cooldown

     const userId = ctx.from.id;
     const now = Date.now();
     
     if (cooldowns.has(userId)) {
       const expiration = cooldowns.get(userId);
       if (now < expiration) {
         const timeLeft = ((expiration - now) / 1000).toFixed(1);
         return ctx.reply(`Espera ${timeLeft} segundos, ¿Acaso no te duele el pito?`);
       }
     }
     
     cooldowns.set(userId, now + COOLDOWN_TIME);

     const autor = ctx.from.first_name;

     if (blacklist.includes(userId)) {
     	return ctx.replyWithMarkdown(`*${autor}* no mas, BLACKLIST`)
     }





	
	  //primero
	  
	
	  //Segundo
	  const reply = ctx.message.reply_to_message;
	  const destinatario = reply ? reply.from.first_name : null;
	
	  const args = ctx.message.text.split(" ").slice(1);
	  const mencionado = ctx.message.entities?.find(e => e.type === "text_mention" || e.type === "mention");

      if (reply && reply.from.id === ctx.botInfo.id) {
        return ctx.reply("¡¿Porque yo?! Enfermo de mierda...");
      }

      if (!destinatario) {
      	return ctx.replyWithMarkdown(`Debes responder al mensaje de alguien *${autor}*`)
      }


	
	  //random gifs
	  const gifs = ["gifs/fuck.gif", "gifs/fuck2.gif", "gifs/fuck3.gif", "gifs/fuck4.gif", "gifs/fuck5.gif"]; // Agrega los nombres de tus archivos aquí
	  const randomGif = gifs[Math.floor(Math.random() * gifs.length)];
	
	  await ctx.replyWithAnimation(
	    { source: randomGif },
	    {
	      caption: `*${autor}* se detonó a *${destinatario}*`,
	      parse_mode: "Markdown"
	    }
	  );
	}
}
