import { I18n } from '@grammyjs/i18n';
import { BotContext } from '../Context';

export const i18n = new I18n<BotContext>({
  defaultLocale: "en", // see below for more information
  directory: __dirname, // Load all translation files from locales/.
  globalTranslationContext(ctx) {
    return { name: ctx.from?.first_name ?? "" };
  },
});