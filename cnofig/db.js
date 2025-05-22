const mysql =require('mysql2')
require("dotenv").config()

 const con=mysql.createPool({
    host:process.env.host,
    user:process.env.user,
    password:process.env.pass,
    database:process.env.dbName,
     waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
})

con.getConnection((err, connection) => {
  if (err) {
    console.error("MySQL connection error:", err);
  } else {
    console.log("MySQL connected successfully");
    connection.release(); 
  }
});
 module.exports=con;
