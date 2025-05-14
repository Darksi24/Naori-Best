const gifs = ["gifs/hug.gif", "gifs/hug2.gif", "gifs/hug3.gif", "gifs/hug4.gif", "gifs/hug5.gif", "gifs/hug6.gif"]


module.exports = {
  name: "hug",
  execute: async (ctx) => {
    const autor = ctx.from.first_name;
    const reply = ctx.message.reply_to_message;
    const destinatario = reply ? reply.from.first_name : null;
    const userId = ctx.from.id;
    const now = Date.now();


	if (!destinatario) {
	  return ctx.reply("Debes responder a un mensaje de alguien.");
	}



	if (cooldowns.has(userId)) {
	  const expiration = cooldowns.get(userId);
	  if (now < expiration) {
	    const timeLeft = ((expiration - now) / 1000).toFixed(1);
	    return ctx.reply(`Espera ${timeLeft}s antes de usar esto otra vez.`);
	  }
	}
	
	cooldowns.set(userId, now + COOLDOWN_TIME);



	const randomGif = gifs[Math.floor(Math.random() * gifs.length)];

	await ctx.replyWithAnimation(
		{ source: randomGif },
		{
			caption: `*${autor}* le dio un abrazito a *${destinatario}*`,
     		parse_mode: "Markdown"
		}
	);
	
    
  }
}
