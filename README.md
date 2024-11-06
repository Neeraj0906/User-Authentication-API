# User Authentication and Authorization API

## Description
This project is a User Authentication and Authorization API built with Node.js, Express.js, Mongoose, and JSON Web Tokens (JWT). The API provides endpoints for user registration, login, and retrieval of user information using Bearer tokens for authentication.

## Technologies Used
- Node.js
- Express.js
- Mongoose (MongoDB)
- JSON Web Tokens (JWT)
- Postman (for API testing)

deployed Url:-https://user-authentication-api-2cw9.onrender.com/    
To Register->https://user-authentication-api-2cw9.onrender.com/api/auth/register
To Login ->https://user-authentication-api-2cw9.onrender.com/api/auth/login
To Get your information->https://user-authentication-api-2cw9.onrender.com/api/auth/me

1. Register User->POST 
Registers a new user.
http://localhost:5000/api/auth/register if someone else is testing it please use https://user-authentication-api-2cw9.onrender.com/api/auth/register

{
  "username": "exampleUser",
  "email": "user@example.com",
  "password": "yourpassword"
}
Response:
->success
{
  "message": "User created successfully!"
}
->error:
{
  "errors": [
    { "msg": "Username must be at least 3 characters long", "param": "username" },
    { "msg": "Must be a valid email", "param": "email" },
    { "msg": "Password must be at least 6 characters long", "param": "password" }
  ]
}

2.Login User->post
 Authenticates the user and returns a JWT.
http://localhost:5000/api/auth/login if someone else is testing it please use https://user-authentication-api-2cw9.onrender.com/api/auth/login
{
  "email": "user@example.com",
  "password": "yourpassword"
}
->Response:
Success:
{
  "message": "Login successful",
  "token": "your_jwt_token"
}
Error:
{
  "error": "Invalid credentials"
}

3. Get User Information->GET
Retrieves the logged-in user's information.
http://localhost:5000/api/auth/me if someone else is testing it please use https://user-authentication-api-2cw9.onrender.com/api/auth/me
Headers:
Authorization: Bearer <your_jwt_token>
Response:
Success:
{
  "_id": "user_id",
  "username": "exampleUser",
  "email": "user@example.com"
}
Error:
{
  "error": "User not found"
}
