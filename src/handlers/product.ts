import express, { Request, Response } from 'express';
import { Product, products } from '../models/product';
import { verifyAuthToken, sign } from '../middleware/tokenhelper';

const productObj = new products();

const index = async (_req: Request, res: Response) => {
  try {
    const allproducts = await productObj.index();
    res.send(allproducts);
  } catch (err) {
    res.send(err);
  }
};

const show = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const product = await productObj.show(id);
    res.send(product);
  } catch (err) {
    res.send(err);
  }
};

const create = async (req: Request, res: Response) => {
  try {
    const product: Product = {
      price: req.body.price,
      name: req.body.name,
    };

    const newproduct = await productObj.create(product);
    res.send(newproduct);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const destroy = async (req: Request, res: Response) => {
  const deleted = await productObj.delete(req.body.id);
  res.send(deleted);
};

const productsRoute = (app: express.Application) => {
  app.get('/products', index);
  app.get('/products/:id', show);
  app.post('/products', verifyAuthToken, create);
  app.delete('/products/:id', verifyAuthToken, destroy);
};

export default productsRoute;
