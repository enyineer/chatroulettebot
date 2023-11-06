# ChatRouletteBot

This is a Telegram Bot for ChatRoulette-like interactions between Telegram Users.

## Features

- Get matched with other Users that speak your Language
- Translated into x different languages
- Send Photos and Videos to other Users
- Directly connect via Telegram if you like each other

## Development

Install Docker on your Machine. Run `docker compose up -d` to run PostgreSQL for local development.

Copy the `.env.example` file to `.env` and fill out all values.

To start the Bot in development mode, run `pnpm run dev`.

## Deploying to Production

To deploy this Project to Production easily with Vercel, just use the following button:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fenyineer%2Fchatroulettebot%2Ftree%2Fmain)

### Environment Variables

Two environment Variables need to be set.

- `DATABASE_URL`:
  - Used to set the Database URL for [Prisma](https://prisma.io)
  - For instructions on how to use Prisma with Vercel, please see [Prismas Documentation](https://www.prisma.io/docs/guides/deployment/serverless/deploy-to-vercel)
- `BOT_TOKEN`
  - The Bot Token you received when creating a new Bot using [BotFather](https://t.me/botfather)
  - Used to set the Bot to the correct Telegram Bot