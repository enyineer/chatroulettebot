import { BotContext, BotConversation } from '../Context';
import { i18n } from '../locales/I18n';
import Languages from '../locales/spokenLanguages.json';
import { InlineKeyboardButton } from 'grammy/types';

const getChosenLangsKeyboard = (spokenLanguages: string[], ctx: BotContext) => {
  const spokenLanguagesKeyboard: InlineKeyboardButton[][] = [];
  console.log('Spoken languages', spokenLanguages);

  let row: InlineKeyboardButton[] = [];
  for (let i = 0; i < Languages.length; i++) {
    const language = Languages[i];

    const isChosen = spokenLanguages.includes(language.code);

    const button: InlineKeyboardButton = {
      callback_data: `sl-toggle-${language.code}`,
      text: isChosen ? `✅ ${language.flag}` : language.flag,
    };

    row.push(button);
    
    if (i > 1 && i % 3 === 0) {
      spokenLanguagesKeyboard.push(row);
      row = [];
    }
  }

  const doneButton: InlineKeyboardButton = {
    callback_data: 'sl-finish',
    text: ctx.t('chose-lang-done'),
  }

  spokenLanguagesKeyboard.push([doneButton]);

  return spokenLanguagesKeyboard;
}

export const choseLangs = async (conversation: BotConversation, ctx: BotContext) => {
  await conversation.run(i18n);

  const spokenLanguages = (await conversation.session).user.spokenLanguages;
  const keyboard = getChosenLangsKeyboard(spokenLanguages, ctx);
  const message = await ctx.reply(ctx.t('chose-lang'), { reply_markup: {
    inline_keyboard: keyboard,
  }});

  let finished = false;
  do {
    const callback = await conversation.waitForCallbackQuery([/^sl-toggle-\w{2}$/g, /^sl-finish$/g]);

    try {
      await ctx.api.answerCallbackQuery(callback.callbackQuery.id, {
        text: 'Updated spoken Languages',
      });
    } catch (err) {
      conversation.error(err);
    }
    
    if (callback.callbackQuery.data === 'sl-finish') {
      finished = true;
      await ctx.api.deleteMessage(message.chat.id, message.message_id);
      await ctx.reply(ctx.t('chose-lang-success'));
    } else {
      const parts = callback.callbackQuery.data.split('-');
      const countryCode = parts[2];
      const spokenLanguages = (await conversation.session).user.spokenLanguages;
      if (spokenLanguages.includes(countryCode)) {
        conversation.log(`Removing ${countryCode}`);
        (await conversation.session).user.spokenLanguages = spokenLanguages.filter(el => el !== countryCode);
      } else {
        conversation.log(`Adding ${countryCode}`);
        (await conversation.session).user.spokenLanguages.push(countryCode)
      }
      const updatedKeyboard = getChosenLangsKeyboard((await conversation.session).user.spokenLanguages, ctx);
      
      await ctx.api.editMessageReplyMarkup(message.chat.id, message.message_id, {
        reply_markup: {
          inline_keyboard: updatedKeyboard,
        }
      });
    }
  } while (finished !== true);
  
}