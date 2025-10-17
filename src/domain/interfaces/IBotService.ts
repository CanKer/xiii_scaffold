
export interface IBotService {
  onStart(userId: number): Promise<string>;
  onPing(userId: number): Promise<string>;
  onEcho(userId: number, text: string): Promise<string>;
}
