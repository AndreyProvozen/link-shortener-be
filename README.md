# Link Shortener - Backend

A simple and efficient URL shortener backend built with **Express** and **MongoDB**.

## 🛠 Stack

- Node.js (Express.js)
- MongoDB (Mongoose)
- Authentication (JSON Web Tokens)
- Validation (express-validator)

## 📡 API Endpoint

### 🔐 Authentication

- **POST** - `/signup` - Register a new user
- **POST** - `/login` - User login
- **POST** - `/logout` - User logout
- **GET** - `/activate/:link` - Activate user account
- **GET** - `/refresh` - Refresh access token

### 🔗 Links

- **POST** - `/links` - Create a shortened link
- **GET** - `/links/:code` - Retrieve full link data
- **GET** - `/links` - Get all user links
- **DELETE** - `/links/:code` - Delete a shortened link

### 🔀 Redirect

- **GET** - `/:code` - Redirect to original URL

## 🖥️ How to Run Locally

### 1️⃣ Clone the repository

```bash
git clone https://github.com/AndreyProvozen/link-shortener-be.git
cd link-shortener-be
```

### 2️⃣ Install Dependencies

```bash
npm install
```

### 3️⃣ Set Environment Variables
Create a `.env` file in the root directory and set variables as described in `.env.example`

### 4️⃣ Run the Application
```bash
npm run dev
```

## 📜 License

This project is licensed under the [MIT License](https://mit-license.org/).
