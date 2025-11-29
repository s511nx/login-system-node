const express = require("express");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const path = require("path");
require("dotenv").config();
const { Pool } = require("pg");
const app = express();
console.log("DATABASE_URL:", process.env.DATABASE_URL);
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false, 
    },
  });
  
 
  pool
    .connect()
    .then((client) => {
      console.log("✅ Connected to Neon PostgreSQL");
      client.release();
    })
    .catch((err) => {
      console.error("❌ Database connection failed", err);
    });
app.use(express.json());
app.use(express.static("public"));

function auth(req , res , next)  {
    console.log("middleware is running ");
    console.log(req.headers.authorization);
    const authHeader = req.headers.authorization;
    
    if (!authHeader) {
        return res.status(401).json({message:"token is missing"});
    } const token = authHeader.split(" ")[1];

    try  {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
        
    } catch (err) {
        return res.status(401).json({message:"Invalid or expired token"})
    }
  
}
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.post("/register", (req, res) => {
const email = req.body.email.trim().toLowerCase();

const password = req.body.password;

pool.query("SELECT * FROM users WHERE email = $1", 
[email], 
(err,result) => {
if (err) {
    return res.status(500).json({message:"Error happened "})
}
if (result.rows.length > 0 ) {
    return res.status(400).json({message:"Email already exists "})
} 
if (result.rows.length == 0 ) {
    const hashedpassword = bcryptjs.hashSync(password,10);
    pool.query("INSERT INTO users (email,password) VALUES ($1, $2)", [email,hashedpassword],
    (err,insertResult) => {
        if (err) {
            return res.status(500).json({message:"Error happened"});
        } 
        return res.status(200).json({message:"User registered successfully"});
    }
    )
}
});
});
app.post("/login", (req,res) => {
const email = req.body.email.trim().toLowerCase();

const password = req.body.password;

pool.query("SELECT * FROM users WHERE email = $1" ,
[email,], 
(err,result) => {
    if (err) {
   return res.status(500).json({message:"Error happened "})
} 
if (result.rows.length === 0 ) {
    return res.status(400).json({message:"Email not found"})
}
const user = result.rows[0];
const isPasswordCorrect = bcryptjs.compareSync(password,user.password);
if (isPasswordCorrect  ==false ) {
return res.status(400).json({message:" wrong password"})
}  const payload = {id : user.id};
    const token = jwt.sign(
    payload,
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
);

return res.json({
    message: "login successfully" ,
    token : token
});
});
});
app.get("/profile" , auth , (req , res) =>  {
 const userId = req.user.id;
 pool.query("SELECT id, email FROM users WHERE id =$1",[userId],(err,result)=> {
    if (err){
        return res.status(500).json({ message: "Database error"});

    }
    if (result.rows.length==0){
        return res.status(404).json({ message: "User not found"});
    }
 return res.json(result.rows[0]);

    });
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
