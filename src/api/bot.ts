import { Bot, webhookCallback } from "grammy";
import { App } from '../app/App';

const token = process.env.BOT_TOKEN;
if (!token) {
  throw new Error("BOT_TOKEN is unset");
}

const bot = new Bot(token);

new App({
  bot,
});

export default webhookCallback(bot, "http");