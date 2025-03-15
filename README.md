# Fuji-Core

## 🚀 Overview
Fuji-Core is the backend API service for managing expenses, built with Node.js and PostgreSQL. It provides a robust and scalable architecture to support authentication, expense tracking, and analytics.

## 🏗 Tech Stack
- **Backend:** Node.js (Express.js)
- **Database:** PostgreSQL
- **Authentication:** JWT (JSON Web Token)
- **ORM:** Sequelize
- **State Management:** Redux (Frontend Integration)
- **Hosting:** AWS EC2

## 📦 Installation

### Prerequisites
Ensure you have the following installed:
- Node.js (v16+)
- PostgreSQL (Latest version)
- npm or yarn

### Steps
1. Clone the repository:
   ```sh
   git clone https://github.com/yourusername/fuji-core.git
   cd fuji-core
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Set up environment variables:
   Create a `.env` file in the root directory and configure it:
   ```env
   CORS_ORIGIN=http://localhost:3000
   NODE_ENV=development
   PORT=9000
   DB_USERNAME=db_user_name
   DB_PASSWORD=db_user_password
   DB_NAME=fuji_core
   DB_HOST=localhost
   DB_DIALECT=postgres
   DB_PORT=5432
   JWT_SECRET=your_key
   CRYPTO_SECRET_KEY=your_key
   ```
4. Run database migrations:
   ```sh
   npx sequelize-cli db:migrate
   ```
5. Start the server:
   ```sh
   npm start
   ```

## 🔑 Authentication
Fuji-Core uses JWT-based authentication. To access protected routes, users must send a valid token in the `Authorization` header.

## 📌 API Endpoints

### Auth
- **POST** `/api/auth/register` – Register a new user
- **POST** `/api/login` – Register a new user

### Expenses
- **POST** `/api/expenses` – Create a new expense
- **POST** `/api/expenses/user-expenses` – Fetch all expenses of the user 
- **PUT** `/api/expenses/:id` – Update an expense
- **DELETE** `/api/expenses/:id` – Delete an expense

## 🛠 Deployment
### Deploying to AWS EC2
1. SSH into your EC2 instance and navigate to the deployment directory.
2. Pull the latest changes:
   ```sh
   git pull origin main
   ```
3. Restart the service (if using PM2):
   ```sh
   pm2 restart all
   ```

## 🤝 Contributing
Contributions are welcome! Feel free to open an issue or submit a pull request.

## 📬 Contact
For queries, contact [tj.tanujsaini@gmail.com] or create an issue in the repository.

