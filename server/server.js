const express = require("express");

const app = express();
const bodyParser = require("body-parser");
const path = require("path");
const cors = require("cors");
const jwt = require("jsonwebtoken");

const authentication = require("./authentication");

const mydb = require("./myDb");
const db = new mydb();

//body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//cors
app.use(cors());

//routes
//register api
app.post("/api/register", (req, res) => {
  db.addUser(
    req.body.username,
    req.body.email,
    req.body.password,
    req.body.gender,
    req.body.dob,
    (req.body.mobile = null),
    (req.body.address = null),
    (req.body.city = null),
    (req.body.state = null),
    (req.body.country = null),
    (req.body.maritalstatus = null)
  )
    .then((out) => res.send(out))
    .catch((err) => res.send(err));
});

//login api
app.post("/api/login", (req, res) => {
  db.getUser(req.body.username, req.body.password)
    .then((out) => res.send(out))
    .catch((err) => res.send(err));
});

//get user details
app.get("/api/userinfo", authentication, (req, res) => {
  const token = req.headers["authorization"].replace("Bearer ", "");
  const { id, username, email } = jwt.decode(token);
  db.getProfile(id, username, email)
    .then((out) => res.send(out))
    .catch((err) => res.send(err));
});

app.listen(4000, (req, res) => {
  console.log(`Server running on http://localhost:4000/`);
});
