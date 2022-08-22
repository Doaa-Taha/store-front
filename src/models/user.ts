import Client from '../database';
import bcrypt from 'bcrypt';

export type User = {
  id?: number;
  firstname: string;
  lastname: string;
  password: string;
};

const { PEPPER, SALT_ROUNDS } = process.env;

export class users {
  // show all users
  async index(): Promise<User[]> {
    try {
      const conn = await Client.connect();
      const sql = 'SELECT * FROM users';
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Could not get users. Error: ${err}`);
    }
  }
  // get specific user using its id
  async show(id: number): Promise<User> {
    try {
      const sql = 'SELECT * FROM users WHERE id=($1)';
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
  // create new user
  async create(u: User): Promise<User> {
    try {
      const sql =
        'INSERT INTO users (firstname, lastname, password) VALUES($1, $2, $3) RETURNING *';
      const conn = await Client.connect();
      const hash = bcrypt.hashSync(
        u.password + PEPPER,
        parseInt(SALT_ROUNDS as string)
      );
      const result = await conn.query(sql, [
        u.firstname,
        u.lastname,
        hash,
      ]);
      const user = result.rows[0];
      conn.release();
      return user;
    } catch (err) {
      throw new Error(
        `Could not add new user whose name is ${u.firstname} ${u.lastname}. Error: ${err}`
      );
    }
  }

  async delete(id: number): Promise<User> {
    try {
      const connection = await Client.connect();
      const sql = 'DELETE FROM users WHERE id=($1) RETURNING *';
      const result = await connection.query(sql, [id]);
      connection.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Failed to delete user whose id =${id}. Error: ${err}`);
    }
  }

  async authenticate(
    firstname: string,
    lastname: string,
    password: string
  ): Promise<User | null> {
    try {
      const conn = await Client.connect();
      //const username: string = firstname + lastname;
      const sql = 'SELECT * FROM users WHERE firstname=($1) AND lastname=($2)';
      const result = await conn.query(sql, [firstname, lastname]);

      //console.log(password + PEPPER);

      if (result.rows.length) {
        const user = result.rows[0];
        //console.log(user);
        if (bcrypt.compareSync(password + PEPPER, user.password)) {
          return user;
        }
      }
      conn.release()
      return null;
    } catch (err) {
      throw new Error(`Failed to sign in . error: ${err}`);
    }
  }
}
