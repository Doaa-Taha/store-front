import { Order, orders } from '../../models/order';
import { users} from '../../models/user';

const ordertest = new orders();
const userstore = new users();



const baseorder: Order = {
  status: 'active',
  user_id: 1,
};
let order: Order;

describe('Orders Model', () => {
  beforeAll(async () => {
      const user = await userstore.create({
      firstname: 'Ahmed',
      lastname: 'Ramy',
      password: 'secretpw',
    });
    if (user.id){
      baseorder.user_id  = user.id as number ;
    } 
  });
  it('should have an index method', () => {
    expect(ordertest.index).toBeDefined();
  });

  it('should have a show method', () => {
    expect(ordertest.show).toBeDefined();
  });

  it('should have a create method', () => {
    expect(ordertest.create).toBeDefined();
  });

  it('should have a delete method', () => {
    expect(ordertest.delete).toBeDefined();
  });

  it('create method should add an order', async () => {
    order = await ordertest.create(baseorder);
    expect({
      status: order.status,     
    }).toEqual({
      status: baseorder.status,
    });
  });

  it('index method should contain the created order', async () => {
    const result = await ordertest.index();
    expect(result).toContain(order);
  });

  it('show method should return the correct order', async () => {
    const result = await ordertest.show(order.id as number);
    expect(result).toEqual(order);
  });

  it('delete method should remove the order', async () => {
    await ordertest.delete(order.id as number);
    const result = await ordertest.show(order.id as number);
    expect(result).not.toContain(order);
  });
});
