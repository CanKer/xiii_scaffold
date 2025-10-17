const ensureEnv = (key: string, fallback: string): void => {
  if (!process.env[key]) {
    process.env[key] = fallback;
  }
};

ensureEnv('TELEGRAM_BOT_TOKEN', 'test-token');
ensureEnv('ADMIN_TELEGRAM_ID', '111');
ensureEnv('PORT', '3000');
ensureEnv('MODE', 'test');
ensureEnv('INTERVAL_MINUTES', '15');

if (!process.env.BOT_BIN) {
  process.env.BOT_BIN = '/tmp/telegram-bot';
}
