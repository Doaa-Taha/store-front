import { Product, products } from '../../models/product';

const producttest = new products();

const baseproduct: Product = {
  name: 'book',
  price: 50,
};
let product: Product;

describe('Product Model', () => {
  it('should have an index method', () => {
    expect(producttest.index).toBeDefined();
  });

  it('should have a show method', () => {
    expect(producttest.show).toBeDefined();
  });

  it('should have a create method', () => {
    expect(producttest.create).toBeDefined();
  });

  it('should have a delete method', () => {
    expect(producttest.delete).toBeDefined();
  });

  it('create method should add a product with name and price', async () => {
    product = await producttest.create(baseproduct);
    expect({ name: product.name, price: product.price }).toEqual({
      name: 'book',
      price: 50,
    });
  });

  it('index method should return a list of products', async () => {
    const result = await producttest.index();
    expect(result).toContain(product);
  });

  it('show method should return the correct product', async () => {
    const result = await producttest.show(product.id as number);
    expect(result).toEqual(product);
  });

  it('delete method should remove the product', async () => {
    await producttest.delete(product.id as number);
    const result = await producttest.show(product.id as number);
    expect(result).not.toEqual(product);
  });
});
