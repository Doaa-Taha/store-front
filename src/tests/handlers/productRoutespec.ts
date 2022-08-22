import supertest from 'supertest';
import app from '../../index';
import { JwtPayload, verify} from 'jsonwebtoken';
import { Product } from '../../models/product';
import {User} from "../../models/user";


const req = supertest(app);
const secretToken = process.env.TOKEN_SECRET as string;


describe('Testing Endpoint: /products', () => {
    const product: Product = {
        name: 'product1',
        price: 50
    };
    let token: string;
    let userId: string;
    let productId: number;

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
         });
        })
  
    it('Testing the create product endpoint', async () => {
  
      await req
        .post('/products')
        .send(product)
        .set('Authorization', "bearer " + token) 
        .expect(200)
        .then(res=>{
            productId = res.body.id       
        })
    });
  
    it('Testing the index endpoint ', async () => {
       await req
        .get('/products')
        .expect(200);
  
    });
  
    it('Testing the show endpoint', async () => {
      await req
        .get(`/products/${productId}`)
        .expect(200);
    });
  
    it('Testing the delete endpoint', async () => {
      await req
        .delete('/products/${productId}')
        .set('Authorization', "bearer " + token)
        .send({ id: productId })
        .expect(200);
    });
   });
