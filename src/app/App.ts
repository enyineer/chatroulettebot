import { PrismaAdapter } from '@grammyjs/storage-prisma';
import { Bot, session } from 'grammy';
import { BotContext } from './Context';
import { prismaClient } from './PrismaClient';

export class App {
  private readonly bot: Bot<BotContext>;

  constructor(props: {
    bot: Bot<BotContext>,
  }) {
    props.bot.use(
      session({
        initial: () => ({ counter: 0 }),
        storage: new PrismaAdapter(prismaClient.session),
      })
    );
    
    this.bot = props.bot;
  }
}