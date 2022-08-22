import { User, users } from '../../models/user';

const usertest = new users();

const baseuser: User = {
  firstname: 'Ahmed',
  lastname: 'Ramy',
  password: 'new2015',
};
let user: User;

describe('User Model', () => {
  it('should have an index method', () => {
    expect(usertest.index).toBeDefined();
  });

  it('should have a show method', () => {
    expect(usertest.show).toBeDefined();
  });

  it('should have a create method', () => {
    expect(usertest.create).toBeDefined();
  });

  it('should have a delete method', () => {
    expect(usertest.delete).toBeDefined();
  });

  it('create method should add a user', async () => {
    user = await usertest.create(baseuser);

    expect({
      firstname: user.firstname,
      lastname: user.lastname
    }).toEqual({
      firstname: "Ahmed",
      lastname: "Ramy"
    });
  });

  it('index method should contains the user', async () => {
    const result = await usertest.index();
    expect(result).toContain(user);
  });

  it('show method should return the correct user', async () => {
    const result = await usertest.show(user.id as number);
    expect(result).toEqual(user);
  });

  it('delete method should remove the user', async () => {
    await usertest.delete(user.id as number);
    const result = await usertest.show(user.id as number);
    expect(result).not.toContain(user);
  });
});
