# API Reference

## Authentication

### POST /auth/login
- **Description**: Authenticate a user and return a JWT token.
- **Request Body**:
  - `email` (string): User's email.
  - `password` (string): User's password.
- **Response**:
  - `token` (string): JWT token.

### POST /auth/register
- **Description**: Register a new user.
- **Request Body**:
  - `email` (string): User's email.
  - `password` (string): User's password.
- **Response**:
  - `id` (number): User's ID.
  - `email` (string): User's email.

## Users

### GET /users
- **Description**: Get a list of all users.
- **Response**:
  - `users` (array): List of users.

### GET /users/:id
- **Description**: Get details of a specific user.
- **Parameters**:
  - `id` (number): User's ID.
- **Response**:
  - `id` (number): User's ID.
  - `email` (string): User's email.

## Products

### GET /products
- **Description**: Get a list of all products.
- **Response**:
  - `products` (array): List of products.

### GET /products/:id
- **Description**: Get details of a specific product.
- **Parameters**:
  - `id` (number): Product's ID.
- **Response**:
  - `id` (number): Product's ID.
  - `name` (string): Product's name.
  - `description` (string): Product's description.
  - `price` (number): Product's price.

### POST /products
- **Description**: Create a new product.
- **Request Body**:
  - `name` (string): Product's name.
  - `description` (string): Product's description.
  - `price` (number): Product's price.
- **Response**:
  - `id` (number): Product's ID.
  - `name` (string): Product's name.
  - `description` (string): Product's description.
  - `price` (number): Product's price.

## Orders

### GET /orders
- **Description**: Get a list of all orders.
- **Response**:
  - `orders` (array): List of orders.

### GET /orders/:id
- **Description**: Get details of a specific order.
- **Parameters**:
  - `id` (number): Order's ID.
- **Response**:
  - `id` (number): Order's ID.
  - `userId` (number): User's ID.
  - `total` (number): Order's total amount.

### POST /orders
- **Description**: Create a new order.
- **Request Body**:
  - `userId` (number): User's ID.
  - `total` (number): Order's total amount.
- **Response**:
  - `id` (number): Order's ID.
  - `userId` (number): User's ID.
  - `total` (number): Order's total amount.
