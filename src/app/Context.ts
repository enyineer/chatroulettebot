import { Conversation, ConversationFlavor } from '@grammyjs/conversations';
import { I18nFlavor } from '@grammyjs/i18n';
import { Context, LazySessionFlavor } from 'grammy';

interface UserBan {
  until: string;
  reason: string;
}

interface UserSettings {
  language: string | null;
  spokenLanguages: string[];
  bans: UserBan[];
}

interface RouletteData {
  partnerChatId: string | null;
}

// write session types
export interface SessionData {
  user: UserSettings;
  roulette: RouletteData;
}

// create context for grammy instance
export type BotContext = Context & LazySessionFlavor<SessionData> & I18nFlavor & ConversationFlavor<Context & LazySessionFlavor<SessionData>>;

// create context for conversations
export type BotConversation = Conversation<BotContext>;