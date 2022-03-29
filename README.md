# sig-backend-postgre

to run this project:

1. install package
    ```
    $ npm i
    ```
2. make .env file
    ```
    $ cp .env.example .env
    ```
3. make config file for database
    ```
    $ cp config/config.json.example config/config.json.example
    ```
4. create database
    ```
    $ npx sequelize-cli db:create
    ```
5. run migration
    ```
    $ npx sequelize-cli db:migrate
    ```
6. run the server
    ```
    node app.js
    ```