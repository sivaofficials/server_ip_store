const express = require("express");
const bodyParser = require("body-parser");
const { localsName, render } = require("ejs");
const cookieParser = require("cookie-parser");
const dbs = require("./src/mongo_connect.js");
const app = express();
let k
app.use(cookieParser());
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));


app.get("/",async (req, res) => {
    let rep = await dbs.getdata();
   
    res.render("index", { data: rep ,data1: k});
  });


  app.post("/add", (req, res) => {
    let data = {
        IP: req.body.ip,
        localname: req.body.localname,
        domain: req.body.domain,
        username: req.body.username,
        password: req.body.password,
      };
    dbs.store(data)
    res.redirect("/")
  });

app.post("/del",(req,res)=>{
  let del=req.body.del1
  dbs.reports_del(del)
  res.redirect("/")
});


  

app.listen(3000, function (req, res) {
    console.log("server is up");
  }); 