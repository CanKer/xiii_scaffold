
import { Bot, Context } from 'grammy';
import type { IBotService } from '@domain/interfaces/IBotService';
import { ENV } from '@config/env';
import { TYPES } from '@ioc/inversify.types';
import { container } from '@app/bootstrap';
import { validateUser } from '@infra/telegram/middleware/authMiddleware';

const botService = container.get<IBotService>(TYPES.IBotService);

export function createBot(): Bot<Context> {
  const bot = new Bot<Context>(ENV.TELEGRAM_BOT_TOKEN);

  bot.command('start', async (ctx) => {
    if (!validateUser(ctx.from?.id)) return;
    const text = await botService.onStart(ctx.from!.id);
    await ctx.reply(text);
  });

  bot.command('ping', async (ctx) => {
    if (!validateUser(ctx.from?.id)) return;
    const text = await botService.onPing(ctx.from!.id);
    await ctx.reply(text);
  });

  bot.on('message:text', async (ctx) => {
    if (!validateUser(ctx.from?.id)) return;
    const text = await botService.onEcho(ctx.from!.id, ctx.message.text);
    await ctx.reply(text);
  });

  return bot;
}
