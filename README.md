# FinalProject_yara_internship2023
This is a small stock management application consisting of several pages built with ReactJS consuming REST API. The API should call another REST API for calculation operations, and the data is stored in PostgreSQL. The backend is written with NestJS using TypeScript, and the frontend - React, and several external packages (react-router, react-bootsrap and more).


The Nest API is placed in the following repo: https://github.com/BoyanK95/assignment-nest-api
I've used some external you can see them all in the package.json file of the project. Some of the more important ones are nodemon, dotenv, bcrypt, class-validator, and sequelize to set the conection with pg. Also due to the fact that the React app is set to run on port 3000, I used port 3001 for the backend. That resulted in cors error, which i fixed through cor package and a CorsMiddleware to all ports.
You can start the server using the common, npm start command or preferably nest start --watch command for dev purposes.

The fronend React part of the app is located in this repo in the my_warehouse_app folder. 
You can start the app using npm start command. Normally react apps run on port 3000, but if its taken just type Y and it should forward you to the next posible port.


You can see the current schema for the backend API and a link to it down here:

https://github.com/BoyanK95/FinalProject_yara_internship2023/blob/main/warehouseAppDB.png


![Database schema](https://github.com/BoyanK95/FinalProject_yara_internship2023/blob/main/warehouseAppDB.png)
