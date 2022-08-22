import express, { Request, Response } from 'express';
import { Order, orders } from '../models/order';
import { verifyAuthToken } from '../middleware/tokenhelper';

const orderObj = new orders();

const index = async (req: Request, res: Response) => {
  try {
    const allorders = await orderObj.index();
    res.send(allorders);
  } catch (err) {
    res.send(err);
  }
};

const show = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const product = await orderObj.show(id);
    res.send(product);
  } catch (err) {
    res.send(err);
  }
};

const create = async (req: Request, res: Response) => {
  try {
    const order: Order = {
      user_id: req.body.user_id,
      status: req.body.status,
    };

    const neworder = await orderObj.create(order);
    res.send(neworder);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const destroy = async (req: Request, res: Response) => {
  const deleted = await orderObj.delete(req.body.id);
  res.send(deleted);
};

const ordersOfUser = async (req: Request, res: Response) => {
  try {
    const orders = await orderObj.ordersOfUser(req.body.userId);
    res.send(orders);
  } catch (err) {
    res.send(err);
  }
};

const ordersRoute = (app: express.Application) => {
  app.get('/orders', verifyAuthToken, index);
  app.get('/orders/:id', verifyAuthToken, show);
  app.post('/orders', verifyAuthToken, create);
  app.delete('/orders/:id', verifyAuthToken, destroy);
  app.get('/orders/:userId', verifyAuthToken, ordersOfUser )
};

export default ordersRoute;
