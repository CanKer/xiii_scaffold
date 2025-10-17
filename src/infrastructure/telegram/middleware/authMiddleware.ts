
import { ENV } from '@config/env';

export function validateUser(userId?: number): boolean {
  if (!userId) return false;
  const allowed = `${ENV.ADMIN_TELEGRAM_ID}`.split(',').map((s) => s.trim());
  return allowed.includes(String(userId));
}
