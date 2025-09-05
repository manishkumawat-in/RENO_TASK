import mysql2 from "mysql2";

let DBConnection;
try {
  DBConnection = mysql2.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
  });

  DBConnection.connect((err) => {
    if (err) {
      console.error("Error connecting to MySQL:", err);
      return;
    }
    console.log("Connected to MySQL database");
  });
} catch (error) {
  console.error("Error initializing MySQL connection:", error);
}

export default DBConnection;
