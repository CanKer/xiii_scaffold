
import { BotService } from '@application/services/BotService';

describe('BotService', () => {
  it('start returns welcome', async () => {
    const svc = new BotService();
    const r = await svc.onStart(1);
    expect(r).toMatch(/Bienvenido/);
  });

  it('ping returns pong with emoji', async () => {
    const svc = new BotService();
    await expect(svc.onPing(42)).resolves.toBe('pong 🏓');
  });

  it('echo returns formatted message', async () => {
    const svc = new BotService();
    await expect(svc.onEcho(42, 'hola')).resolves.toBe('Dijiste: hola');
  });
});
