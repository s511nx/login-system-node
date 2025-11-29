A full-stack authentication system built using Node.js, Express.js, PostgreSQL (Neon DB), JWT, and Vanilla JavaScript, featuring secure backend logic and a clean, functional frontend.

🌐 Live Demo

🔗 https://login-system-node.onrender.com/login.html

⚙️ Features

✔️ User Registration

✔️ Secure Login with JWT

✔️ Password Hashing (bcrypt)

✔️ Protected Profile Page

✔️ Authentication Middleware

✔️ Hosted on Render

✔️ Neon PostgreSQL Cloud Database

✔️ Complete Frontend + Backend System

🏗️ Tech Stack
Backend:

Node.js

Express.js

Bcrypt.js

JSON Web Tokens (JWT)

Neon PostgreSQL (pg)

Frontend:

HTML

CSS

JavaScript (Fetch API)

Deployment:

Render

GitHub

📁 Folder Structure
/public
    ├── index.html
    ├── login.html
    ├── profile.html
    ├── style.css
    ├── login.js
    ├── profile.js
server.js
package.json
.gitignore
.env (ignored)

🚀 How to Run Locally
1️⃣ Install dependencies
npm install

2️⃣ Create a .env file
DATABASE_URL=your_neon_postgres_url
JWT_SECRET=your_secret

3️⃣ Start the server
node server.js


Server will run on:
👉 http://localhost:3000

🔐 Authentication Flow

User registers → stored in PostgreSQL with hashed password

User logs in → server returns JWT token

Token saved in localStorage

Profile page sends request with Authorization: Bearer <token>

Middleware verifies token

User info is returned

📌 Future Improvements

Password reset

Change email/password

Refresh tokens

Better UI with TailwindCSS

Database migrations

✨ Author

👤 Sultan Alotaibi