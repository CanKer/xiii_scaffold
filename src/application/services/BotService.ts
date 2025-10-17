
import 'reflect-metadata';
import { injectable } from 'inversify';
import type { IBotService } from '@domain/interfaces/IBotService';

@injectable()
export class BotService implements IBotService {
  async onStart(userId: number): Promise<string> {
    return `Bienvenido (${userId}) 👋`;
  }
  async onPing(_userId: number): Promise<string> {
    return 'pong 🏓';
  }
  async onEcho(_userId: number, text: string): Promise<string> {
    return `Dijiste: ${text}`;
  }
}
