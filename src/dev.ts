import dotenv from 'dotenv';
import { Bot } from "grammy";
import { App } from './app/App';
import { BotContext } from './app/Context';

dotenv.config();

const token = process.env.BOT_TOKEN;
if (!token) {
  throw new Error("BOT_TOKEN is unset");
}

const bot = new Bot<BotContext>(token);

new App({
  bot,
});

bot.start().catch(err => console.error(err));