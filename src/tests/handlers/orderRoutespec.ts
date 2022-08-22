import supertest from 'supertest';
import app from '../../index';
import { JwtPayload, verify } from 'jsonwebtoken';
import { Order } from '../../models/order';
import {User} from "../../models/user";

const req = supertest(app);
const secretToken = process.env.TOKEN_SECRET as string;

describe('Testing Endpoint: /orders', () => {
    const order: Order = {
        status: 'active',
        user_id: 1
    };
    let token: string;
    let userId: string;
    let orderId: number;

    beforeAll(async () => {
        const user:User = {
            firstname: 'Mona',
            lastname: 'Adel',
            password: 'password123',
        }
        await req
          .post('/users')
          .send(user)
          .then((res) => {
            token = res.body;
            const decoded = verify(
              token as string,
              secretToken
            ) as JwtPayload;
            userId = decoded.user.userId;
            if(userId){
                order.user_id = (userId as unknown) as number;
            }
         });
        })
  
    it('Testing the create order endpoint', async () => {
  
      await req
        .post('/orders')
        .send(order)
        .set('Authorization', "bearer " + token) 
        .expect(200)
        .then(res=>{
            orderId = res.body.id       
        })
    });
  
    it('Testing the index endpoint ', async () => {
       await req
        .get('/orders')
        .set('Authorization', "bearer " + token) 
        .expect(200);
  
    });
  
    it('Testing the show endpoint', async () => {
      await req
        .get(`/orders/${orderId}`)
        .set('Authorization', "bearer " + token) 
        .expect(200);
    });
  
    it('Testing the delete endpoint', async () => {
      await req
        .delete(`/orders/${orderId}`)
        .set('Authorization', "bearer " + token)
        .send({ id: orderId })
        .expect(200);
    });

    it('Testing the ordersOfUser endpoint', async () => {
        await req
          .get(`/orders/${userId}`)
          .set('Authorization', "bearer " + token) 
          .expect(200);
      });

   });