import { NullDbConnector } from '@infra/db/DbConnector';

describe('NullDbConnector', () => {
  it('connect resolves without work', async () => {
    const conn = new NullDbConnector();
    await expect(conn.connect()).resolves.toBeUndefined();
  });

  it('disconnect resolves without work', async () => {
    const conn = new NullDbConnector();
    await expect(conn.disconnect()).resolves.toBeUndefined();
  });

  it('ready resolves true', async () => {
    const conn = new NullDbConnector();
    await expect(conn.ready()).resolves.toBe(true);
  });
});
