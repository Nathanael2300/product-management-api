# Product Management API

REST API for product management built with Node.js and Express following MVC architecture and SDET-oriented practices.

---

## 🚀 Project Goal

This project was created to practice:

* REST API development
* MVC architecture
* Backend fundamentals
* SDET practices
* Automated API testing
* Clean code organization
* Service layer architecture
* Validation and error handling

---

## 🧱 Architecture

The project follows an MVC-based architecture with service layer separation:

```text
Route → Controller → Service → Model
```

### Layers

| Layer       | Responsibility                 |
| ----------- | ------------------------------ |
| Routes      | Defines API endpoints          |
| Controllers | Handles requests/responses     |
| Services    | Business rules and validations |
| Models      | Data structure and persistence |

---

## 📁 Project Structure

```text
src/
 ├── controllers/
 ├── services/
 ├── models/
 ├── routes/
 ├── database/
 ├── middlewares/
 ├── utils/
 ├── app.js
 └── server.js

tests/
 ├── unit/
 ├── integration/
 └── e2e/
```

---

## 🛠️ Technologies

### Backend

* Node.js
* Express.js
* SQLite
* JavaScript

### Testing

* Cypress
* SuperTest
* Chai
* Faker

---

## 📦 Features

### Products

* Create product
* Get all products
* Get product by ID
* Update product
* Delete product

### Validations

* Required fields
* Invalid price validation
* Duplicate product validation
* Product existence validation

---

## 🌐 API Endpoints

| Method | Endpoint      | Description       |
| ------ | ------------- | ----------------- |
| GET    | /products     | Get all products  |
| GET    | /products/:id | Get product by ID |
| POST   | /products     | Create a product  |
| PUT    | /products/:id | Update a product  |
| DELETE | /products/:id | Delete a product  |

---

## 🧪 Testing Strategy

This project follows SDET-oriented testing practices.

### Test Types

#### Unit Tests

Tests isolated business rules from:

* Services
* Validations
* Utility functions

#### Integration Tests

Tests communication between:

* Routes
* Controllers
* Services

#### API Tests

Tests complete endpoint behavior:

* Status codes
* Response body
* Error handling
* Schema validation

---

## 📌 Testing Scenarios

### Positive Scenarios

* Successfully create product
* Successfully update product
* Successfully delete product
* Successfully retrieve products

### Negative Scenarios

* Invalid product ID
* Missing required fields
* Negative price
* Duplicate products
* Product not found

---

## ▶️ Running the Project

### Install dependencies

```bash
npm install
```

### Start development server

```bash
npm run dev
```

### Start production server

```bash
npm start
```

---

## 🧪 Running Tests

### Run Cypress

```bash
npx cypress open
```

### Run tests in headless mode

```bash
npx cypress run
```

---

---

## 🗄️ Database

The project uses SQLite as the relational database for local development and testing purposes.

### Planned Database Stack

* SQLite
* SQL queries
* Relational data modeling

---

## 🎯 Future Improvements

* JWT authentication
* PostgreSQL integration
* Prisma ORM
* Docker support
* CI/CD pipeline
* Swagger documentation
* Rate limiting
* Logging system
* Pagination and filtering

---

## 📚 Learning Focus

This project focuses on:

* Backend architecture
* API design
* SDET mindset
* Automated testing
* Scalable code organization
* Software quality practices

---

## 👨‍💻 Author

Developed as part of backend and SDET studies.
