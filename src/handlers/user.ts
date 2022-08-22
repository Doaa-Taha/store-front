import express, { Request, Response } from 'express';
import { User, users } from '../models/user';
import { verifyAuthToken, sign } from '../middleware/tokenhelper';

const usersobject = new users();

const index = async (_req: Request, res: Response) => {
  try {
    const allusers = await usersobject.index();
    res.send(allusers);
  } catch (err) {
    res.send(err);
  }
};

const show = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const user = await usersobject.show(id);
    res.send(user);
  } catch (err) {
    res.send(err);
  }
};

const create = async (req: Request, res: Response) => {
  try {
    const user: User = {
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      password: req.body.password,
    };

    const newuser = await usersobject.create(user);
    const token = sign(newuser.id as number);
    res.json(token);
  } catch (err) {
    res.status(400);
    res.send(err);
  }
};

const destroy = async (req: Request, res: Response) => {
  const id = req.body.id;
  const deleted = await usersobject.delete(id);
  res.send(deleted);
};

const authenticate = async (req: Request, res: Response) => {
  const { firstname, lastname, password } = req.body;
  const username = firstname + lastname;
  if (!username || !password) {
    return res.status(400).send('Error, missing parameters. ');
  }
  try {
    const user = await usersobject.authenticate(firstname, lastname, password);
    if (user === null) {
      res.status(401);
      res.json('Incorrect user information');
    } else {
      const token = sign(user.id as number);
      res.json(token);
    }
  } catch (err) {
    const e = err as Error;
    res.status(401).send(e.message);
  }
};

const usersRoute = (app: express.Application) => {
  app.get('/users', verifyAuthToken, index);
  app.get('/users/:id', verifyAuthToken, show);
  app.post('/users', create);
  app.delete('/users/:id', verifyAuthToken, destroy);
  app.post('/users/login', authenticate);
};

export default usersRoute;
