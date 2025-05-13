const cooldowns = new Map(); // fuera del export para mantener entre llamadas
const COOLDOWN_TIME = 10000; // en milisegundos (5 segundos por ejemplo)
const gifs = ["gifs/kickbutts.gif", "gifs/kickbutts2.gif", "gifs/kickbutts3.gif", "gifs/kickbutts4.gif", "gifs/kickbutts5.gif", "gifs/kickbutts6.gif", "gifs/kickbutts7.gif"]


module.exports = {
    name: "kickbutts",
    execute: async (ctx) => {
        const autor = ctx.from.first_name;
        const reply = ctx.message.reply_to_message;
        const destinatario = reply ? reply.from.first_name: null;
        const userId = ctx.from.id;

        const randomGif = gifs[Math.floor(Math.random() * gifs.length)];

        if (!destinatario) {
            return ctx.reply("Debes responder a un mensaje.");
        }

        if (reply && reply.from.id === ctx.botInfo.id) {
            return ctx.reply("¿Porque yo? ¿que te hice?");
        }
        
        if (reply && reply.from.id === userId) {
            return ctx.reply("Sería Ilógico....")
        }


        
        const now = Date.now();

        if (cooldowns.has(userId)) {
            const expiration = cooldowns.get(userId);
            if (now < expiration) {
                const timeLeft = ((expiration - now) / 1000).toFixed(1);
                return ctx.reply(`Espera ${timeLeft}s antes de usar esto otra vez.`);
            }
        }

        cooldowns.set(userId, now + COOLDOWN_TIME)

        await ctx.replyWithAnimation(
            {
                source: randomGif
            },
            {
                caption: `*${autor}* pateó a *${destinatario}*`,
                parse_mode: "Markdown"
            }
        );


    }
}