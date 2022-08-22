import Client from '../database';

export type Product = {
  id?: number;
  name: string;
  price: number;
};

export class products {
  // show all products
  async index(): Promise<Product[]> {
    try {
      const conn = await Client.connect();
      const sql = 'SELECT * FROM products';
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Could not get products. Error: ${err}`);
    }
  }
  // get specific product using its id
  async show(id: number): Promise<Product> {
    try {
      const sql = 'SELECT * FROM products WHERE id=($1)';
      const conn = await Client.connect();
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(
        `Could not find that product whose id= ${id}. Error: ${err}`
      );
    }
  }
  // create new product
  async create(p: Product): Promise<Product> {
    try {
      const sql =
        'INSERT INTO products (name, price) VALUES($1, $2) RETURNING *';
      const conn = await Client.connect();
      const result = await conn.query(sql, [p.name, p.price]);
      const product = result.rows[0];
      conn.release();
      return product;
    } catch (err) {
      throw new Error(
        `Could not add new product with name  ${p.name} and price ${p.price}. Error: ${err}`
      );
    }
  }

  // delete a product
  async delete(id: number): Promise<Product> {
    try {
      const connection = await Client.connect();
      const sql = 'DELETE FROM products WHERE id=($1) RETURNING *';
      const result = await connection.query(sql, [id]);
      connection.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Failed to delete user whose id =${id}. Error: ${err}`);
    }
  }
}
