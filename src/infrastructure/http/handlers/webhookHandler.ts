
import type { APIGatewayProxyEventV2, APIGatewayProxyResultV2 } from 'aws-lambda';
import { createBot } from '@infra/telegram/GrammyBot';
import { logger } from '@utils/logger';

const bot = createBot();

export async function handler(event: APIGatewayProxyEventV2): Promise<APIGatewayProxyResultV2> {
  try {
    if (!event.body) {
      return { statusCode: 400, body: JSON.stringify({ ok: false, error: 'Empty body' }) };
    }
    const update = JSON.parse(event.body);
    await bot.handleUpdate(update);
    return { statusCode: 200, body: JSON.stringify({ ok: true }) };
  } catch (err) {
    logger.error('webhook error', err);
    return { statusCode: 500, body: JSON.stringify({ ok: false }) };
  }
}
