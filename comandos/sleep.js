const cooldowns = new Map(); // fuera del export para mantener entre llamadas
const COOLDOWN_TIME = 30000; 
const gifs = ["gifs/sleep.gif", "gifs/sleep2.gif", "gifs/sleep3.gif", "gifs/sleep4.gif", "gifs/sleep5.gif", "gifs/sleep6.gif", "gifs/sleep7.gif", "gifs/sleep8.gif"]


module.exports = {
    name: "sleep",
    execute: async (ctx) => {
        const autor = ctx.from.first_name;
        const userId = ctx.from.id;

        const randomGif = gifs[Math.floor(Math.random() * gifs.length)];



        
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
                caption: `*${autor}* tiene sueeeeño...`,
                parse_mode: "Markdown"
            }
        );


    }
}