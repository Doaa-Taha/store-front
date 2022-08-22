import express from 'express';
import usersRoute from './handlers/user';
import ordersRoute from './handlers/order';
import productsRoute from './handlers/product';

const app: express.Application = express();
const port = 3030;

app.use(express.json());

app.get('/', async (_req, res) => {
  res.send('Welcome to our storefront');
});

usersRoute(app);
ordersRoute(app);
productsRoute(app);

app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});

export default app;
