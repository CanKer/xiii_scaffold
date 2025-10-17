
import type { APIGatewayProxyResultV2, APIGatewayProxyStructuredResultV2 } from 'aws-lambda';

type HealthHandlers = typeof import('@infra/http/handlers/healthHandlers');

const toStructuredResult = (
  result: APIGatewayProxyResultV2,
): APIGatewayProxyStructuredResultV2 => {
  if (typeof result === 'string') {
    throw new Error('Expected a structured API Gateway response.');
  }

  return result;
};

describe('Health handlers', () => {
  const containerGet = jest.fn();
  let healthz: HealthHandlers['healthz'];
  let readyz: HealthHandlers['readyz'];

  beforeEach(async () => {
    jest.resetModules();
    containerGet.mockReset();
    jest.doMock('@app/bootstrap', () => ({
      container: {
        get: containerGet,
      },
    }));
    const handlers: HealthHandlers = await import('@infra/http/handlers/healthHandlers');
    healthz = handlers.healthz;
    readyz = handlers.readyz;
  });

  afterEach(() => {
    jest.resetModules();
  });

  it('healthz returns ok', async () => {
    const res = toStructuredResult(await healthz({} as any));
    expect(res.statusCode).toBe(200);
    expect(JSON.parse(res.body as string)).toEqual({ status: 'ok' });
  });

  it('readyz returns 200 when dependencies ready', async () => {
    containerGet.mockReturnValue({ ready: jest.fn().mockResolvedValue(true) });
    const res = toStructuredResult(await readyz({} as any));
    expect(res.statusCode).toBe(200);
    const body = JSON.parse(res.body as string);
    expect(body).toEqual({ ready: true, deps: { db: true } });
  });

  it('readyz returns 503 when dependencies unavailable', async () => {
    containerGet.mockReturnValue({ ready: jest.fn().mockResolvedValue(false) });
    const res = toStructuredResult(await readyz({} as any));
    expect(res.statusCode).toBe(503);
    const body = JSON.parse(res.body as string);
    expect(body).toEqual({ ready: false, deps: { db: false } });
  });
});
