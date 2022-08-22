import supertest from 'supertest';
import app from '../../index';
//import express from 'express';
import { JwtPayload, verify, sign } from 'jsonwebtoken';
import { User } from '../../models/user';



const req = supertest(app);

describe('Testing Endpoint: /users', () => {
  const user: User = {
    firstname: 'Hana',
    lastname: 'Emam',
    password: 'password123',
  };
  const secretToken = process.env.TOKEN_SECRET as string;
  let token: string;
  let userId: string;
  

  it('Testing the create endpoint', async () => {

    await req
      .post('/users')
      .send(user)
      .expect(200)
      .then((res) => {
        token = res.body;
        const decoded = verify(
          token as string,
          secretToken
        ) as JwtPayload;
        userId = decoded.user.userId;
      });
  });

  it('Testing the index endpoint ', async () => {
     await req
      .get('/users')
      .set('Authorization', "bearer " + token) 
      .expect(200);

  });

  it('Testing the show endpoint', async () => {
    await req
      .get(`/users/${userId}`)
      .set('Authorization', "bearer " + token)
      .expect(200);
  });

  it('Testing the authorization endpoint', async () => {
    await req.post('/users/login')
    .send({
      firstname: user.firstname,
      lastname: user.lastname,
      password: user.password
    })
    .set('Authorization', "bearer " + token)
    .then((res) =>{
      token = sign({ user: { userId } }, secretToken);  
      expect(res.status).toBe(200);
    })
  });

  it('Testing the delete endpoint', async () => {
    await req
      .delete('/users/${userId}')
      .set('Authorization', "bearer " + token)
      .send({ id: userId })
      .expect(200);
  });
 });