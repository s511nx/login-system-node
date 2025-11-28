
const express = require("express");
const mysql = require("mysql2");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const path = require("path");
const app = express();

app.use(express.json());
app.use(express.static("public"));

require("dotenv").config();
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

const db = mysql.createConnection({
host : process.env.DB_HOST,
port : 3306,
user : process.env.DB_USER,
password : process.env.DB_PASS,
database: process.env.DB_NAME

});
db.connect((err) => {
    if (err) {
        console.log("DataBase connection failed ", err);
    } else {
        console.log("Connected to Mysql successfully");
    }
});
app.get("/", (req, res) => {
    res.sendfile(path.json(_dirname , "index.html"));
});
app.post("/register", (req, res) => {
const email = req.body.email.trim().toLowerCase();

const password = req.body.password;

db.query("SELECT * FROM Users WHERE email = ?", 
[email], 
(err,result) => {
if (err) {
    return res.status(500).json({message:"Error happened "})
}
if (result.length > 0 ) {
    return res.status(400).json({message:"Email already exists "})
} 
if (result.length == 0 ) {
    const hashedpassword = bcryptjs.hashSync(password,10);
    db.query("INSERT INTO Users (email,password) VALUES (?,?)", [email,hashedpassword],
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

db.query("SELECT * FROM Users WHERE email = ?" ,
[email,], 
(err,result) => {
    if (err) {
   return res.status(500).json({message:"Error happened "})
} 
if (result.length === 0 ) {
    return res.status(400).json({message:"Email not found"})
}
const user = result[0];
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
 db.query("SELECT id, email FROM Users WHERE id =?",[userId],(err,result)=> {
    if (err){
        return res.status(500).json({ message: "Database error"});

    }
    if (result.length==0){
        return res.status(404).json({ message: "User not found"});
    }
 return res.json(result[0]);

    });
});
app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
