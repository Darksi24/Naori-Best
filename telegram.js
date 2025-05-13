const { Telegraf } = require("telegraf");
const fs = require("fs");
const path = require("path");





// Reemplaza con tu token real
const bot = new Telegraf("7442347920:AAG7dHEtlVrqHEq-SJaPo8qsWilJbmsk7aM"); 







// Cargar comandos desde la carpeta "comandos"
const comandos = path.join(__dirname, "comandos");
fs.readdirSync(comandos).forEach(file => {
  const cmd = require(path.join(comandos, file));
  if (cmd.name && cmd.execute) {
    bot.command(cmd.name, ctx => cmd.execute(ctx));
  }
});
///// BOT JOIN
bot.on("new_chat_members", async (ctx) => {
  for (const user of ctx.message.new_chat_members) {
    // Si el que entra es el bot
    if (user.username === ctx.me) {
      await ctx.reply("¡Gracias por agregarme al grupo! ♡");
      continue;
    }

    // Si es un usuario nuevo
    const nombre = user.first_name || "Usuario";
    await ctx.replyWithPhoto(
      { source: "welcome.jpg" },
      {
        caption: `¡Bienvenido/a al grupo, ${nombre}!\nEsperamos que la pases genial.\n\n1. 🚫 Cero CP\nNo se permite enviar, pedir ni compartir contenido de lolis realistas. Quien lo haga recibirá ban temporal o permaban según la falta.\n\n2. 🖼️💥 Sticker Party control\nHasta 20 stickers seguidos está bien; más de eso se vuelve spam y molesta. ¡Usa tus stickers con amor y medida! 😘\n\n3. 📸🐢 Foto-lag cuidado\nEvita subir más de 20 fotos de golpe: uno de nuestros admins sufre de lag y queremos que todos estén al 100%. 😉\n\n4. 🌙🔒 Horarios de apertura\nEl grupo cierra a las 22:00 y vuelve a abrir a las 08:00 (hora México), para que todos podamos descansar bien.\n\n¡Gracias por colaborar y crear un ambiente chévere para todos! 🙌✨`,
        parse_mode: "Markdown"
      }
    );
  }
});



const filePath = "./familias.json";

bot.on("callback_query", async (ctx) => {
  const data = ctx.callbackQuery.data;
  const [accion, id1, id2] = data.split("_");

  const fromId = ctx.from.id;

  // Solo puede responder el destinatario
  if (parseInt(id2) !== fromId) {
    return ctx.answerCbQuery("No puedes responder a esta propuesta.");
  }

  const user1 = await ctx.telegram.getChat(id1);
  const user2 = await ctx.telegram.getChat(id2);

  if (accion === "aceptar") {
    const matrimonios = fs.existsSync(filePath) ? JSON.parse(fs.readFileSync(filePath)) : {};
    const now = Math.floor(Date.now() / 1000)

    matrimonios[Date.now()] = {
      user1: parseInt(id1),
      user2: parseInt(id2),
      timestamp: now
    };

    fs.writeFileSync(filePath, JSON.stringify(matrimonios, null, 2));

    await ctx.editMessageText(`¡Felicidades! *${user1.first_name}* y *${user2.first_name}* ahora están casados.`, { parse_mode: "Markdown" });
  }

  if (accion === "rechazar") {
    await ctx.editMessageText(`*${user2.first_name}* ha rechazado a *${user1.first_name}*.`, { parse_mode: "Markdown" });
  }
});



module.exports = bot
console.log("Bot en marcha.");
