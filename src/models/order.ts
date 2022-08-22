import Client from '../database';

export type Order = {
  id?: number;
  user_id: number;
  status: string;
  
};

export class orders {
  // show all orders
  async index(): Promise<Order[]> {
    try {
      const conn = await Client.connect();
      const sql = 'SELECT * FROM orders';
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Could not get orders. Error: ${err}`);
    }
  }
  // get specific order using its id
  async show(id: number): Promise<Order> {
    try {
      const sql = 'SELECT * FROM orders WHERE id=($1)';
      const conn = await Client.connect();
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(
        `Could not find that order whose id= ${id}. Error: ${err}`
      );
    }
  }
  // create order
  async create(o: Order): Promise<Order> {
    try {
      const sql =
        'INSERT INTO orders (user_id, status) VALUES($1, $2) RETURNING *';
      const conn = await Client.connect();
      const result = await conn.query(sql, [o.user_id, o.status]);
      const order = result.rows[0];
      conn.release();
      return order;
    } catch (err) {
      throw new Error(`Could not add new order. Error: ${err}`);
    }
  }
  //delete order
  async delete(id: number): Promise<Order> {
    try {
      const connection = await Client.connect();
      const sql = 'DELETE FROM orders WHERE id=($1) RETURNING *';
      const result = await connection.query(sql, [id]);
      connection.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Failed to delete order whose id =${id}. Error: ${err}`);
    }
  }

  async ordersOfUser(userId: number): Promise<Order[]> {
    try {
      const conn = await Client.connect();
      const sql = 'SELECT * FROM orders WHERE user_id=($1) ';
      const result = await conn.query(sql, [userId]);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Could not get orders. Error: ${err}`);
    }
  }
}
