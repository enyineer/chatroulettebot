import { Bot } from 'grammy';

export class App {
  private readonly bot: Bot;

  constructor(props: {
    bot: Bot,
  }) {
    this.bot = props.bot;
  }
}