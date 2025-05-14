import express from 'express';
import bot from './telegram.js';

const app = express();
app.use(express.json());

app.post('/webhook', (req, res) => {
  bot.handleUpdate(req.body, res);
});

app.get('/', async (req, res) => {
  // Solo se ejecuta una vez cuando se accede
  const webhookUrl = 'https://TU_PROYECTO.vercel.app/webhook';
  try {
    await bot.telegram.setWebhook(webhookUrl);
    res.send('Bot activo y webhook configurado.');
  } catch (err) {
    res.status(500).send('Error configurando webhook: ' + err.message);
  }
});

export default app;
