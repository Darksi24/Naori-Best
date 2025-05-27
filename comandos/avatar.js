module.exports = {
    name: "avatar",
    execute: async (ctx) => {
        const userId = ctx.message?.reply_to_message?.from?.id || ctx.from.id;

        try {
        const photos = await ctx.telegram.getUserProfilePhotos(userId);

        if (!photos.total_count) {
        return ctx.reply("Este usuario no tiene foto de perfil.");
        }

        const fileId = photos.photos[0][0].file_id; // First photo, first size

        await ctx.replyWithPhoto(fileId, {
            caption: `Foto de perfil de ${ctx.message?.reply_to_message?.from?.first_name || ctx.from.first_name}`
        });
        } catch (error) {
        console.error("Error al obtener la foto de perfil:", error);
        ctx.reply("No pude obtener la foto de perfil.");
        }
     }
 };
