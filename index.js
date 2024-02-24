const express = require("express");
const bodyParser = require("body-parser");
const { localsName, render } = require("ejs");
const cookieParser = require("cookie-parser");
const app = express();
let k;
app.use(cookieParser());
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

const dbs = require("./src/mongo_connect.js");
const backend = require("./src/backend.js");

function makeid(length) {
  let result = "";
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}

app.get("/store", async (req, res) => {
  let token = backend.checktoks(req.cookies.token);
  // console.log(token);
  if (token == 1) {
    let rep = await dbs.getdata();
    res.render("index", { data: rep, data1: k });
  } else {
    res.redirect("/");
  }
});

app.post("/add", (req, res) => {
  let data = {
    IP: req.body.ip,
    localname: req.body.localname,
    domain: req.body.domain,
    username: req.body.username,
    password: req.body.password,
    st: makeid(5),
  };

  dbs.store(data);
  res.redirect("/");
});

app.post("/del", (req, res) => {
  let del = req.body.del1;
  dbs.reports_del(del);
  res.redirect("/");
});

app.get("/", async (req, res) => {
  let token = backend.checktoks(req.cookies.token);
  if (token == 1) {
    let rep = await dbs.getdata();
    res.render("index", { data: rep, data1: k });
  } else {
    res.render("login");
  }
});

app.post("/login", async (req, res) => {
  let uname = req.body.username;
  let passw = req.body.password;
  console.log(`${uname} , ${passw}`);
  let toks = await backend.auth(uname, passw);
  console.log(toks);
  if (toks != "f") {
    res.cookie("token", toks);
    res.redirect("/store");
  } else {
    res.render("login");
  }
  // res.render("login");
});

app.post("/cretuser", async (req, res) => {
  let user = {
    uname: req.body.uname,
    paswrd: req.body.paswrd,
    toks: req.body.toks,
  };
  let val = await backend.createNewuser(user);
  if (val == 1) {
    res.json({ status: "success", msg: "account Created" });
  } else {
    res.json({ status: "failed", msg: "account Not Created" });
  }
});

app.listen(3000, function (req, res) {
  console.log("server is up");
});
