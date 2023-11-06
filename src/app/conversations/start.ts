import { BotContext, BotConversation } from '../Context';

export const start = async (conversation: BotConversation, ctx: BotContext) => {
  await ctx.reply(ctx.t('welcome-1'));
  await ctx.reply(ctx.t('welcome-2'));
  await ctx.conversation.enter('choseLangs');
}