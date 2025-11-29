🔐 Login Authentication System

A simple and secure authentication system built using:

Node.js

Express.js

JWT (JSON Web Token)

Bcrypt.js

Neon PostgreSQL Database

⚙️ Features

✔️ User Registration

✔️ User Login

✔️ Password Hashing (bcrypt)

✔️ Protected Profile Route

✔️ Token-Based Authentication (JWT)

✔️ Cloud Database using Neon PostgreSQL

🚀 How to Run the Project
1. Install Dependencies
npm install

2. Create a .env file in the project root

Add the following environment variables (without real values):

DATABASE_URL=your_neon_database_url
JWT_SECRET=your_jwt_secret


⚠️ Do NOT commit the real .env values to GitHub.

3. Start the Server
node server.js


If everything is correct, you should see:

Server is running on port 3000
✅ Connected to Neon PostgreSQL

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
.env  (ignored via .gitignore)

🔐 Authentication Flow

User registers → data stored in PostgreSQL with hashed password

User logs in → server returns a signed JWT token

User opens profile → frontend sends token in headers

Middleware validates token → returns user data

📌 Notes

.env file is ignored automatically (via .gitignore)

Uses PostgreSQL (Neon) instead of MySQL

Database connection handled using pg library

Project is structured to easily deploy on Render or other platforms

💡 Future Improvements (Optional)

Add logout button

Add password reset feature

Add refresh tokens

Improve frontend UI/UX

✨ Author

Sultan Alotaibi