
export interface AppEnv {
  TELEGRAM_BOT_TOKEN: string;
  ADMIN_TELEGRAM_ID: string;
  PORT: number;
  MODE: string;
  INTERVAL_MINUTES: number;
  BOT_BIN?: string;
}

function requireEnv(name: string, defaultValue?: string): string {
  const val = process.env[name] ?? defaultValue;
  if (val === undefined || val === "") {
    throw new Error(`Missing required env var: ${name}`);
  }
  return val;
}

export const ENV: AppEnv = {
  TELEGRAM_BOT_TOKEN: requireEnv("TELEGRAM_BOT_TOKEN"),
  ADMIN_TELEGRAM_ID: requireEnv("ADMIN_TELEGRAM_ID"),
  PORT: parseInt(requireEnv("PORT", "3000"), 10),
  MODE: requireEnv("MODE", "paper"),
  INTERVAL_MINUTES: parseInt(requireEnv("INTERVAL_MINUTES", "15"), 10),
  BOT_BIN: process.env.BOT_BIN
};
