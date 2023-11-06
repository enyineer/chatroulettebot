import { Bot, webhookCallback } from "grammy";
import { App } from '../app/App';
import { BotContext } from '../app/Context';

const token = process.env.BOT_TOKEN;
if (!token) {
  throw new Error("BOT_TOKEN is unset");
}

const bot = new Bot<BotContext>(token);

new App({
  bot,
});

export default webhookCallback(bot, "http");