import { Context, SessionFlavor } from 'grammy';

// write session types
interface SessionData {
  counter: number;
}

// create context for grammy instance
export type BotContext = Context & SessionFlavor<SessionData>;