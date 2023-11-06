import { PrismaAdapter } from '@grammyjs/storage-prisma';
import { Bot, lazySession } from 'grammy';
import { BotContext, SessionData } from './Context';
import { prismaClient } from './PrismaClient';
import { conversations, createConversation } from '@grammyjs/conversations';
import { choseLangs } from './conversations/choseLangs';
import { i18n } from './locales/I18n';

export class App {
  private readonly bot: Bot<BotContext>;

  constructor(props: {
    bot: Bot<BotContext>,
  }) {
    // Add error Handler
    props.bot.errorHandler = (error) => {
      console.log(error);
    }

    // Sets up the session with Prisma
    props.bot.use(
      lazySession({
        initial: () => ({
          roulette: {
            partnerChatId: null,
          },
          user: {
            bans: [],
            language: null,
            spokenLanguages: [],
          }
        }),
        storage: new PrismaAdapter<SessionData>(prismaClient.session),
      })
    );

    props.bot.use(i18n);

    // Sets up the conversations Plugin
    props.bot.use(conversations());

    // Add Conversation functions
    props.bot.errorBoundary(
      (err) => console.error("choseLangs Conversation threw an error!", err),
      createConversation(choseLangs),
    );

    props.bot.command('start', async (ctx) => {
      // Enter setup
      await ctx.conversation.enter("choseLangs");
    });

    this.bot = props.bot;
  }
}