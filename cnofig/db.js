const mysql =require('mysql2')
require("dotenv").config()
 const con=mysql.createConnection({
    host:process.env.host,
    user:process.env.user,
    password:process.env.pass,
    database:process.env.dbName
 });

 module.exports=con;