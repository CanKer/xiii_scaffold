import { healthz, readyz } from '@infra/http/handlers/healthHandlers';
describe('Health handlers', () => {
    it('healthz returns ok', async () => {
        const res = await healthz({});
        expect(res.statusCode).toBe(200);
        expect(JSON.parse(res.body)).toEqual({ status: 'ok' });
    });
    it('readyz returns 200 or 503 depending on deps', async () => {
        const res = await readyz({});
        expect([200, 503]).toContain(res.statusCode);
        const body = JSON.parse(res.body);
        expect(body).toHaveProperty('ready');
        expect(body).toHaveProperty('deps.db');
    });
});
