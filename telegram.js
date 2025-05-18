const {
    Telegraf
} = require("telegraf");
const fs = require("fs");
const path = require("path");

// Reemplaza con tu token real
const bot = new Telegraf("7442347920:AAG7dHEtlVrqHEq-SJaPo8qsWilJbmsk7aM");

const {
    registrarInteraccion
} = require("./utils/interacciones");

const comandosPath = path.join(__dirname, "comandos");

fs.readdirSync(comandosPath).forEach(file => {
    const cmd = require(path.join(comandosPath, file));

    if (cmd.name && cmd.execute) {
        bot.command(cmd.name, async (ctx) => {
            try {
                const reply = ctx.message.reply_to_message;

                if (reply) {
                    const count = registrarInteraccion(
                        cmd.name,
                        String(ctx.from.id),
                        String(reply.from.id)
                    );
                    ctx.state.interactionCount = count;
                }

                await cmd.execute(ctx);
            } catch (err) {
                console.error(`Error en /${cmd.name}:`, err);
                ctx.reply("Error ejecutando comando.");
            }
        });

        console.log(`Comando cargado: ${cmd.name}`);
    }
});



// Evento: cuando alguien se une al grupo
bot.on("new_chat_members", async (ctx) => {
    for (const user of ctx.message.new_chat_members) {
        if (user.username === ctx.me) {
            await ctx.reply("¡Gracias por agregarme al grupo! ♡");
            continue;
        }

        const nombre = user.first_name || "Usuario";

        await ctx.replyWithPhoto(
            "https://naori-best.vercel.app/welcome.jpg", // <--- URL pública
            {
                caption: `¡Bienvenido/a al grupo, ${nombre}!\nEsperamos que la pases genial.\n\n1. 🚫 Cero CP\nNo se permite enviar, pedir ni compartir contenido de lolis realistas. Quien lo haga recibirá ban temporal o permaban según la falta.\n\n2. 🖼️💥 Sticker Party control\nHasta 20 stickers seguidos está bien; más de eso se vuelve spam y molesta. ¡Usa tus stickers con amor y medida! 😘\n\n3. 📸🐢 Foto-lag cuidado\nEvita subir más de 20 fotos de golpe: uno de nuestros admins sufre de lag y queremos que todos estén al 100%. 😉\n\n4. 🌙🔒 Horarios de apertura\nEl grupo cierra a las 22:00 y vuelve a abrir a las 08:00 (hora México), para que todos podamos descansar bien.\n\n¡Gracias por colaborar y crear un ambiente chévere para todos! 🙌✨`,
                parse_mode: "Markdown"
            }
        );
    }
});

// Evento: respuestas a botones de callback
const filePath = "./familias.json";
const OWNER_ID = 6262019167; // Cambia por tu ID de Telegram

bot.on("callback_query", async (ctx) => {
  const data = ctx.callbackQuery.data;

  // Matrimonios normales
  if (data.startsWith("aceptar_") || data.startsWith("rechazar_")) {
    const [accion, id1, id2] = data.split("_");
    const fromId = ctx.from.id;

    if (parseInt(id2) !== fromId) {
      return ctx.answerCbQuery("No puedes responder a esta propuesta.");
    }

    const user1 = await ctx.telegram.getChat(id1);
    const user2 = await ctx.telegram.getChat(id2);

    if (accion === "aceptar") {
      const matrimonios = fs.existsSync(filePath)
        ? JSON.parse(fs.readFileSync(filePath))
        : {};
      const now = Math.floor(Date.now() / 1000);

      matrimonios[Date.now()] = {
        user1: parseInt(id1),
        user2: parseInt(id2),
        user1_username: user1.username,
        user2_username: user2.username,
        timestamp: now
      };

      fs.writeFileSync(filePath, JSON.stringify(matrimonios, null, 2));

      await ctx.editMessageText(
        `¡Felicidades! *${user1.first_name}* y *${user2.first_name}* ahora están casados.`,
        { parse_mode: "Markdown" }
      );
    }

    if (accion === "rechazar") {
      await ctx.editMessageText(
        `*${user2.first_name}* ha rechazado a *${user1.first_name}*.`,
        { parse_mode: "Markdown" }
      );
    }

    return;
  }

  // Solicitudes de divorcio (solo el OWNER puede aceptar/rechazar)
  if (data.startsWith("aprobarDivorcio_") || data.startsWith("rechazarDivorcio_")) {
    const esDueño = ctx.from.id === OWNER_ID;
    if (!esDueño) return ctx.answerCbQuery("Solo el Juez [@DSRK_24] puede aprobar esto.");

    const accion = data.split("_")[0];
    const matrimonioId = data.split("_")[1];

    if (!fs.existsSync(filePath)) return ctx.answerCbQuery("No hay registros.");
    const matrimonios = JSON.parse(fs.readFileSync(filePath));

    if (!matrimonios[matrimonioId]) {
      return ctx.editMessageText("El matrimonio ya no existe.");
    }

    if (accion === "aprobarDivorcio") {
      delete matrimonios[matrimonioId];
      fs.writeFileSync(filePath, JSON.stringify(matrimonios, null, 2));
      await ctx.editMessageText("Divorcio aprobado y matrimonio eliminado.");
    }

    if (accion === "rechazarDivorcio") {
      await ctx.editMessageText("El divorcio fue rechazado por el Juez.");
    }

    return;
  }
});
/////////// Chats Log



let grupos = []

// Cargar archivo de grupos si existe
if (fs.existsSync('grupos.json')) {
  try {
    const data = fs.readFileSync('grupos.json', 'utf-8')
    grupos = JSON.parse(data)
  } catch (error) {
    console.error('Error al cargar grupos:', error)
  }
}

// Middleware global: se ejecuta con cualquier tipo de mensaje
bot.use((ctx, next) => {
  const chat = ctx.chat

  // Solo registra grupos y supergrupos
  if (chat && (chat.type === 'group' || chat.type === 'supergroup')) {
    if (!grupos.includes(chat.id)) {
      grupos.push(chat.id)
      fs.writeFileSync('grupos.json', JSON.stringify(grupos, null, 2))
      console.log(`Nuevo grupo registrado: ${chat.title || chat.id}`)
    }
  }

  return next()
})

/////////// Commands Admin

bot.command('gp', async (ctx) => {
  if (ctx.from.id !== 6262019167) return

  for (const id of grupos) {
    try {
      const chat = await ctx.telegram.getChat(id)
      ctx.reply(`Grupo: ${chat.title} (ID: ${chat.id})`)
    } catch (err) {
      ctx.reply(`Error al obtener grupo con ID ${id}: ${err.description}`)
    }
  }
})


bot.action(/joinTrio_(.+)/, async (ctx) => {
  const gifs = ["https://naori-best.vercel.app/gifs/trio.gif", "https://naori-best.vercel.app/gifs/trio2.gif", "https://naori-best.vercel.app/gifs/trio3.gif", "https://naori-best.vercel.app/gifs/trio4.gif", "https://naori-best.vercel.app/gifs/trio5.gif", "https://naori-best.vercel.app/gifs/trio6.gif", "https://naori-best.vercel.app/gifs/trio7.gif"];
    const chatId = Number(ctx.match[1]);
      const user = ctx.from;

        if (!trios[chatId]) return ctx.answerCbQuery("Este trío ya se cerró o no existe.");

          const trio = trios[chatId];
          const yaUnido = trio.miembros.find(u => u.id === user.id);
          if (yaUnido) return ctx.answerCbQuery("Ya estás en este trío.");

          trio.miembros.push(user);
          const total = trio.miembros.length;
          const nombres = trio.miembros.map(u => u.first_name).join(", ");

          await ctx.editMessageText(`¡Se está formando un trío!\n\nMiembros: ${total}/3\n${nombres}`,
            {
              parse_mode: "Markdown",
              reply_markup: total < 3
               ? Markup.inlineKeyboard([
              Markup.button.callback("✅ Unirme", `joinTrio_${chatId}`)
                                    ])
                                  : undefined
            }
           );

          if (total === 3) {
            const randomGif = gifs[Math.floor(Math.random() * gifs.length)];
            
           delete trios[chatId];
           await ctx.telegram.sendAnimation(randomGif, chatId, `¡Trío completado!\n\n${nombres} lo hicieron juntos.`);
          }
});

bot.launch();
console.log("bot iniciado");
