// db.ts
import mysql from "mysql2/promise";

const pool = mysql.createPool({
  host: "localhost",
  user: "vaibhavyatra",
  password: "@Vaibhav1",
  database: "yatra",
  connectionLimit: 10,
});

export default pool;
