
import 'reflect-metadata';
import { Container } from 'inversify';
import { TYPES } from '@ioc/inversify.types';
import { BotService } from '@application/services/BotService';
import type { IBotService } from '@domain/interfaces/IBotService';
import { NullDbConnector } from '@infra/db/DbConnector';

export const container = new Container({ defaultScope: 'Singleton' });

container.bind<IBotService>(TYPES.IBotService).to(BotService);
container.bind(TYPES.BotService).toService(TYPES.IBotService);
container.bind(TYPES.DbConnector).to(NullDbConnector);
