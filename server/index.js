const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const port = 5555;

app.use(bodyParser.json());
app.use(cors());

const db = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "",
  database: "menu",
});

db.connect((err) => {
  if (err) {
    console.error("Database connection error:", err); // 輸出錯誤資訊
    return;
  }
  console.log("Database connected"); // 輸出成功訊息
});

app.post("/login", (req, res) => {
  const { username, password } = req.body;
  const query = "SELECT * FROM admin WHERE username = ? AND password = ?";
  db.query(query, [username, password], (err, results) => {
    if (err) {
      res.status(500).send("Error querying the database");
      return;
    }
    if (results.length > 0) {
      res.status(200).send("Login successful"); // 輸出成功訊息
    } else {
      res.status(401).send("Invalid credentials"); // 輸出錯誤訊息
    }
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
