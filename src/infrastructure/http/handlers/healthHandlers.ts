
import type { APIGatewayProxyEventV2, APIGatewayProxyResultV2 } from 'aws-lambda';
import { container } from '@app/bootstrap';
import { TYPES } from '@ioc/inversify.types';
import type { DbConnector } from '@infra/db/DbConnector';

export async function healthz(_event: APIGatewayProxyEventV2): Promise<APIGatewayProxyResultV2> {
  return { statusCode: 200, body: JSON.stringify({ status: 'ok' }) };
}

export async function readyz(_event: APIGatewayProxyEventV2): Promise<APIGatewayProxyResultV2> {
  const db = container.get<DbConnector>(TYPES.DbConnector);
  const dbReady = await db.ready();
  const ready = dbReady; // en el futuro: checar otros servicios remotos

  return {
    statusCode: ready ? 200 : 503,
    body: JSON.stringify({ ready, deps: { db: dbReady } }),
  };
}
