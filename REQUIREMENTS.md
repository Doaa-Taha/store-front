 <p>   The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.</p>

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application.

## `API Endpoints`
### Products
- Index /products **[GET]**
- Create /products **[POST]** [token required]
- show /products/:id **[GET]**
- Delete /products/:id **[DELETE]** [token required]

### Users
- Index /users **[GET]** [token required]
- create /users **[POST]**
- show /users/:id **[GET]** [token required]
- delete /users/:id **[DELETE]** [token required]
- Authenticate /users/login **[POST]**

### Orders
- Index /orders **[GET]** [token required]
- Create /orders/create **[POST]** [token required]
- show /orders/:id **[GET]** [token required]
- Delete /orders/:id **[DELETE]** [token required]


## `Data Shapes`
#### Products 
- id  : primary key 
- name  : string      
- price : number     

#### Users
- id :primary key
- firstName: string
- lastName: string
- password: string

#### Orders
- id
- id of each product in the order
- quantity of each product in the order
- user_id foreign key
- status of order (active or complete)

####  product_order
- id : PRIMARY KEY
- product_id: foreign key
- order_id: foreign key
- quantity : number


## ` database schema `
 #### _users table_
| column-name   |  type |
| ---- | ---- |
| id   | SERIAL PRIMARY KEY |
| firstname  | VARCHAR(50) NOT NULL |
| lastname  |  VARCHAR(50) NOT NULL |
| password | VARCHAR   NOT NULL |

#### _products table_
| column-name  |  type|
| ---- | ---- |
| id   |  SERIAL PRIMARY KEY |
| name  | VARCHAR(50) NOT NULL |
| price  |  INTEGER  NOT NULL |

#### _orders table_
| column-name | type |
| --- | --- | 
|id  | SERIAL PRIMARY KEY |
| user_id  |  bigint REFERENCES users(id)  `this is a foreign key` |
| status  |   VARCHAR(50) |

#### _product_order table_
| column-name | type |
| --- | --- | 
| id   | SERIAL PRIMARY KEY |
| product_id | bigint REFERENCES products(id) `this is a foreign key` |
| order_id  |  bigint REFERENCES orders(id)   `this is a foreign key` |
| quantity  |   INTEGER |

