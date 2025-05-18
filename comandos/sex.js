const { Markup } = require("telegraf")
const gifs = ["https://naori-best.vercel.app/gifs/sexd.gif", "https://naori-best.vercel.app/gifs/sexd2.gif", "https://naori-best.vercel.app/gifs/sexd3.gif", "https://naori-best.vercel.app/gifs/sexd4.gif", "https://naori-best.vercel.app/gifs/sexd5.gif", "https://naori-best.vercel.app/gifs/sexd6.gif", "https://naori-best.vercel.app/gifs/sexd7.gif"];

const trios = {};

module.exports = {
      name: "sex",
        execute: async (ctx) => {
            // Randomizamls el gif

            const randomGif = gifs[Math.floor(Math.random() * gifs.length)];
            


            // Buscamos el tipo de sexo
            const args = ctx.message.text.split(" ");
            const modo = args[1]?.toLowerCase();
            // terminamos

            // checamos si hay argumentos
            if (!modo || !["duo", "trio"].includes(modo)) {
              return ctx.reply("Uso: \n/sex [Dúo]  \n/sex [Trío]");
            }
              
            //Checamos el sexo en pareja             
            if (modo === "duo") {
              const reply = ctx.message.reply_to_message;
              // si no responde a un mensaje (usuario)
              if (!reply) return ctx.reply("Debes responder al mensaje de alguie...");

              //salimos del error, ahora si es correcto

              // obtenemos el autor del comando
              const nombre1 = ctx.from.first_name;
              //obtenemos el involucrado
              const nombre2 = reply.from.first_name;

              // ahora enviamos el mensaje 
              ctx.replyWithAnimation(randomGif, 
                {
                  caption: `*${nombre1}* y *${nombre2}* se dieron amor mutuamente `,
                  parse_mode: "Markdown"
                }
              );

            } //Ahora salimos del primer checador

            //Ahora Checamos trio
            if (modo === "trio") {
              // obtenemos el id del chat
              const chatId = ctx.chat.id;
              const initiator = ctx.from;

              //creamos el trio

              trios[chatId] = {
                miembros: [initiator],
              };

              //ahora enviamos la propuesta al chat

              const msg = await ctx.reply(`*${initiatior.first_name}* quiere iniciar un trio.\n\nMiembros: 1/3`,
                {
                  parse_mode: "Markdown",
                  reply_markup: Markup.inlineKeyboard([
                    Markup.button.callback("✅ Unirte", `joinTrio_${chatId}`)
                  ])
                }
              );
              trios[chatId].mensajeId = msg.message_id;  
                            
                            
            }
          }
};