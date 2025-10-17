
import { validateUser } from '@infra/telegram/middleware/authMiddleware';

describe('Auth middleware', () => {
  const OLD = process.env.ADMIN_TELEGRAM_ID;
  beforeAll(() => { process.env.ADMIN_TELEGRAM_ID = '111,222'; });
  afterAll(() => { process.env.ADMIN_TELEGRAM_ID = OLD; });

  it('denies when undefined', () => {

    expect(validateUser(undefined)).toBe(false);
  });

  it('allows listed user', () => {

    expect(validateUser(111)).toBe(true);
  });

  it('denies not listed user', () => {
    
    expect(validateUser(333)).toBe(false);
  });
});
