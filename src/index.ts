import { Hono } from 'hono';

const app = new Hono();

const PAY_TO = '0x40291A67AA3854255A01238acd3451ecCa2748D1';

app.all('/hello', (c) => {
  const paymentHeader = c.req.header('PAYMENT-SIGNATURE') || c.req.header('X-PAYMENT');

  if (!paymentHeader) {
    const requirement = {
      x402Version: 2,
      error: 'Payment Required',
      accepts: [
        {
          scheme: 'exact',
          network: 'eip155:8453',
          amount: '1000',
          asset: '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913',
          payTo: PAY_TO,
          maxTimeoutSeconds: 60,
          extra: {
            name: 'USD Coin',
            version: '2',
          },
        },
      ],
    };

    const encoded = btoa(JSON.stringify(requirement));
    c.header('PAYMENT-REQUIRED', encoded);
    return c.json(requirement, 402);
  }

  return c.json({
    status: 'ok',
    message: 'Hello from my vAPI x402 v2 endpoint!',
  });
});

export default app;
