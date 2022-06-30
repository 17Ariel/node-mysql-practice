const express = require("express");
const port = process.env.PORT || 3000;
const cors = require("cors");
const dotenv = require("dotenv");

const app = express();
dotenv.config("./env");
const dbconn = require("./db.config");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

app.get("/api/users", (req, res) => {
  sql = "SELECT * FROM usertb";
  dbconn.query(sql, (err, rows, field) => {
    if (err) throw err;
    res.json(rows);
  });
});

app.get("/api/users/:id", (req, res) => {
  const id = req.params.id;
  sql = `SELECT * FROM usertb WHERE id = '${id}'`;
  dbconn.query(sql, (err, rows, fields) => {
    if (err) throw err;

    if (rows.length > 0) {
      res.json(rows);
    } else {
      res.status(400).json({ msg: `id not found ${id}` });
    }
  });
});

app.post("/api/users/fullname", (req, res) => {
  let fullname = req.body.fullname;
  sql = `SELECT * FROM usertb WHERE fullname LIKE'${fullname}%'`;
  dbconn.query(sql, (err, rows, fields) => {
    if (err) throw err;

    if (rows.length > 0) {
      res.json(rows);
    } else {
      res.status(400).json({ msg: `fullname not found ${fullname}` });
    }
  });
});

app.post("/api/users", (req, res) => {
  let fullname = req.body.fullname;
  let address = req.body.address;
  let gender = req.body.gender;

  sql = `INSERT INTO usertb(fullname,address,gender) VALUES('${fullname}','${address}','${gender}')`;
  dbconn.query(sql, (err, rows, fields) => {
    if (err) throw err;
    res.json({ msg: "successfully added a data" });
  });
});

app.put("/api/users", (req, res) => {
  let fullname = req.body.fullname;
  let address = req.body.address;
  let gender = req.body.gender;
  let id = req.body.id;

  sql = `UPDATE usertb SET fullname ='${fullname}', address ='${address}', gender ='${gender}' WHERE id = '${id}'`;
  dbconn.query(sql, (err, rows, fields) => {
    if (err) throw err;
    res.json({ msg: "updated successfully" });
  });
});

app.delete("/api/users", (req, res) => {
  let id = req.body.id;
  sql = `DELETE FROM usertb WHERE id='${id}'`;
  dbconn.query(sql, (err, rows, fields) => {
    if (err) throw err;
    res.json({ msg: "one data has been deleted" });
  });
});
app.listen(port, () => console.log(`You are running at localhost:${port}`));
