const express = require("express");
const bodyParser = require("body-parser");
const { localsName, render } = require("ejs");
const cookieParser = require("cookie-parser");
const dbs = require("./src/mongo_connect.js");
const app = express();

app.use(cookieParser());
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));


app.get("/", (req, res) => {
    res.render("index");
  });

arr =[]

  app.post("/add", (req, res) => {
    let data = {
        IP: req.body.ip,
        localname: req.body.localname,
        domain: req.body.domain,
        username: req.body.username,
        password: req.body.password,
      };
   
    arr.push(data)
    console.log(arr)
  });

app.listen(3000, function (req, res) {
    console.log("server is up");
  }); 