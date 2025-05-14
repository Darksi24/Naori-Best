// index.js
import express from 'express';
import { Telegraf } from 'telegraf';

const app = express();
const bot = new Telegraf('7442347920:AAG7dHEtlVrqHEq-SJaPo8qsWilJbmsk7aM');

app.use(express.json());
app.post(`/webhook`, (req, res) => {
  bot.handleUpdate(req.body, res);
});

bot.telegram.setWebhook('https://naori-best.vercel.app/webhook');

app.get('/', (req, res) => {
  res.send('Bot activo y funcionando');
});

export default app;
