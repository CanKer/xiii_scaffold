
import 'reflect-metadata';
import { injectable } from 'inversify';

export interface DbConnector {
  connect(): Promise<void>;
  disconnect(): Promise<void>;
  ready(): Promise<boolean>;
}

@injectable()
export class NullDbConnector implements DbConnector {
  async connect(): Promise<void> { /* no-op */ }
  async disconnect(): Promise<void> { /* no-op */ }
  async ready(): Promise<boolean> { return true; }
}
