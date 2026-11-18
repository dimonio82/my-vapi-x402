import { Hono } from 'hono';
import { paymentMiddleware } from 'x402-hono';

const app = new Hono();

app.use(
  '/hello',
  paymentMiddleware(
    '0xdD4ce7C4343d17624b82eb85F0Fa92bd75F086bc',
    {
      'GET /hello': {
        price: '$0.001',
        network: 'base',
      },
    },
    {
      url: 'https://x402.org/facilitator',
    }
  )
);

app.get('/hello', (c) => {
  return c.json({
    status: 'ok',
    message: 'Hello from my vAPI x402 endpoint!',
  });
});

export default app;
