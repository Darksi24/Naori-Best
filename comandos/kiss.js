const cooldowns = new Map(); // fuera del export para mantener entre llamadas
const COOLDOWN_TIME = 10000; // en milisegundos (5 segundos por ejemplo)
const gifs = ["gifs/kiss.gif", "gifs/kiss2.gif", "gifs/kiss3.gif", "gifs/kiss4.gif", "gifs/kiss5.gif", "gifs/kiss6.gif", "gifs/kiss7.gif"];

module.exports = {
  name: "kiss",
  execute: async (ctx) => {
    const autor = ctx.from.first_name;
    const reply = ctx.message.reply_to_message;
    const destinatario = reply ? reply.from.first_name : null;
    const userId = ctx.from.id;
    const now = Date.now();

    if (!destinatario) {
      return ctx.reply("Debes responder a un mensaje de alguien.");
    }

    if (reply && reply.from.id === userId) {
    	return ctx.replyWithMarkdown(`Mejor... que alguien mas te bese *${autor}*`)
    }


	//cooldown
	
	if (cooldowns.has(userId)) {
	  const expiration = cooldowns.get(userId);
	  if (now < expiration) {
	    const timeLeft = ((expiration - now) / 1000).toFixed(1);
	    return ctx.reply(`Espera ${timeLeft} segundos, ¡Vas a ahogarlo con tantos besos!`);
	  }
	}
	
	cooldowns.set(userId, now + COOLDOWN_TIME)



	const randomGif = gifs[Math.floor(Math.random() * gifs.length)];

	await ctx.replyWithAnimation(
		{ source: randomGif },
		{
			caption: `*${autor}* le dio un besito a *${destinatario}*`,
			parse_mode: "Markdown"
		}
	);

    
  }
}
