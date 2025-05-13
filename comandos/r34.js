const owners = [6262019167, 987654321, 7978613098, 6369387359, 7986475283]; // IDs de los dueños

module.exports = {
  name: "rule34",
  execute: async (ctx) => {
    if (!owners.includes(ctx.from.id)) return ctx.reply("Nop, eso es malo para ti...");

    const args = ctx.message.text.split(" ").slice(1);
    if (!args.length) return ctx.reply("Usa: /rule34 <tags>");

    const tags = args.join("_");

    try {
      const res = await require("axios").get("https://api.rule34.xxx/index.php", {
        params: {
          page: "dapi", s: "post", q: "index",
          json: 1, limit: 1000, pid: 20, tags
        }
      });

      const posts = res.data;
      const respuesta = [
            "¡Esto no es apropiado para mí! 😣",
            "¡Oye!, eso... ¿Porque lo haces? asqueroso...",
            "Eres un degenerado, ¿Lo sabías? 😐",
            "Solo..., me tapare los ojos....",
            "Esto.... No lo puedo ver, ¡Maldito enfermo!! 😖"
      ];


      const frase = respuesta[Math.floor(Math.random() * respuesta.length)];
      if (!Array.isArray(posts) || posts.length === 0)
        return ctx.reply("Sin resultados.");

      posts.sort(() => 0.5 - Math.random()).slice(0, 1).forEach(p => {
        if (p.file_url) ctx.replyWithPhoto(p.file_url, 
        {
        	caption: `${frase}`,
        	parse_mode: "Markdown"
        });
      });
    } catch (e) {
      ctx.reply("Error al buscar.");
    }
  }
};
