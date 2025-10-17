import { BotService } from '@application/services/BotService';
describe('BotService', () => {
    it('start returns welcome', async () => {
        const svc = new BotService();
        const r = await svc.onStart(1);
        expect(r).toMatch(/Bienvenido/);
    });
});
