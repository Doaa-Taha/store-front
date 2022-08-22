CREATE TABLE product_order(
    id SERIAL PRIMARY KEY,
    product_id bigint REFERENCES products(id),
    order_id bigint REFERENCES orders(id),
    quantity INTEGER
);