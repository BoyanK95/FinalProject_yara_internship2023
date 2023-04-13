# FinalProject_yara_internship2023
This is a small stock management application consisting of several pages built with ReactJS consuming REST API. The API should call another REST API for calculation operations, and the data is stored in PostgreSQL. The backend is written with NestJS using TypeScript, and the frontend - React, and several external packages (react-router, react-bootsrap and more).


The Nest API is placed in the following repo, due to a bug with github-desctop and nest (creates default new repo with a new Nest project): https://github.com/BoyanK95/assignment-nest-api

I've used some external packages you can see them all in the package.json file of the project. Some of the more important ones are nodemon, dotenv, bcrypt, class-validator, and sequelize to set the conection with pg. Also due to the fact that the React app is set to run on port 3000, I used port 3001 for the backend. That resulted in cors error, which I've fixed through cor package and a CorsMiddleware to all ports.
You can start the server using the common, npm start command or preferably nest start --watch command for dev purposes.

The fronend React part of the app is located in this repo in the my_warehouse_app folder. 
You can start the app using npm start command. Normally react apps run on port 3000, but if its taken just type Y and it should forward you to the next posible port.



Screens
Screen 1: Login and Registration
On this screen, users can register and log in to their "space" and "data."

Screen 2: Warehouse Operations
On this screen, users can perform different warehouse operations like delete, create, or edit. They can also list all the warehouses for the specific user.

Screen 3: Product Entry
On this screen, users can quickly add products to the master products list and see a full list of the product list.

Screen 4: Warehouse Stock Movement
On this screen, users can switch between warehouses within the page. The page shows the current stock amount, free stock space remaining, and a historic list of Imports and exports. The user can also add a new import or export.

Database Schema
The database schema includes the following tables:

users
products
warehouses
warehouses_products
stock_movements


You can see the current schema for the backend API and a link to it down here:

https://github.com/BoyanK95/FinalProject_yara_internship2023/blob/main/warehouseAppDB.png


![Database schema](https://github.com/BoyanK95/FinalProject_yara_internship2023/blob/main/warehouseAppDB.png)
