
import { healthz, readyz } from '@infra/http/handlers/healthHandlers';

describe('Health handlers', () => {
  it('healthz returns ok', async () => {
    const res = await healthz({} as any);
    expect(res.statusCode).toBe(200);
    expect(JSON.parse(res.body as string)).toEqual({ status: 'ok' });
  });

  it('readyz returns 200 or 503 depending on deps', async () => {
    const res = await readyz({} as any);
    expect([200,503]).toContain(res.statusCode);
    const body = JSON.parse(res.body as string);
    expect(body).toHaveProperty('ready');
    expect(body).toHaveProperty('deps.db');
  });
});
