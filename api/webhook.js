const bot = require('../telegram');

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      await bot.handleUpdate(req.body);
    } catch (err) {
      console.error('Error en webhook:', err);
    }
    return res.status(200).send('OK');
  }

  res.status(200).send('Naori bot está en línea.');
}