import { describe, expect, it, beforeEach, afterAll } from '@jest/globals';

describe('ENV config', () => {
  const ORIGINAL_ENV = process.env;

  beforeEach(() => {
    jest.resetModules();
    process.env = { ...ORIGINAL_ENV };
  });

  afterAll(() => {
    process.env = ORIGINAL_ENV;
  });

  it('loads configured environment values', async () => {
    process.env.TELEGRAM_BOT_TOKEN = 'token';
    process.env.ADMIN_TELEGRAM_ID = '123';
    process.env.PORT = '4000';
    process.env.MODE = 'prod';
    process.env.INTERVAL_MINUTES = '10';
    process.env.BOT_BIN = '/bin/bot';

    const { ENV } = await import('@config/env');
    expect(ENV).toEqual({
      TELEGRAM_BOT_TOKEN: 'token',
      ADMIN_TELEGRAM_ID: '123',
      PORT: 4000,
      MODE: 'prod',
      INTERVAL_MINUTES: 10,
      BOT_BIN: '/bin/bot',
    });
  });

  it('falls back to defaults when optional vars omitted', async () => {
    process.env.TELEGRAM_BOT_TOKEN = 'token';
    process.env.ADMIN_TELEGRAM_ID = '123';
    delete process.env.PORT;
    delete process.env.MODE;
    delete process.env.INTERVAL_MINUTES;
    delete process.env.BOT_BIN;

    const { ENV } = await import('@config/env');
    expect(ENV.PORT).toBe(3000);
    expect(ENV.MODE).toBe('paper');
    expect(ENV.INTERVAL_MINUTES).toBe(15);
    expect(ENV.BOT_BIN).toBeUndefined();
  });

  it('throws when a required variable is empty', async () => {
    process.env.TELEGRAM_BOT_TOKEN = '';
    process.env.ADMIN_TELEGRAM_ID = '123';

    await expect(import('@config/env')).rejects.toThrow('Missing required env var: TELEGRAM_BOT_TOKEN');
  });
});
