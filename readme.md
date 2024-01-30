## project name: store-front
### tools used : postgresSql, typescript, nodejs, jasmine, js
   -> to be able to use this project follow these steps
1) add a file in the root directory of the project called .env
2) create 2 databases one for developing and the other for testing ...in psql terminal write these commands:
     1.  CREATE DATABASE postgres_dev
     2.  CREATE DATABASE postgres_test
3) in the .env file set the missing ### environment variables with your own values:

      * POSTGRES_HOST=localhost
      * POSTGRES_DB=postgres_dev
      * POSTGRES_USER=###
      * POSTGRES_PASSWORD=###
      * TEST_DB=postgres_test
      * ENV=dev
      * PORT=3030
      * POSTGRES_PORT=5432
      * BCRYPT_PASSWORD=###
      * SALT_ROUNDS=10
      * TOKEN_SECRET=###
      * PEPPER=###

4) install all dependencies
   =>npm install 
5) excute migration to add tables to databases  
    =>db-migrate up 
6) build the app (convert typescript to js)    
    =>npm run build 
7) Start the server
    =>npm run start 
8) run unit tests with jasmine
    => npm run tast 
9) for text formatting and linting
    =>npm run lint && npm run prettier 
