const mongoose = require("mongoose");

//connect server
mongoose.connect("mongodb://127.0.0.1:27017/server_ip");

const UserSchema = new mongoose.Schema({
  IP: String,
  localname: String,
  domain: String,
  username: String,
  password: String,
  st: String,
});
const Ip = mongoose.model("ip", UserSchema);

const SecuritySchema = new mongoose.Schema({
  uname: String,
  paswrd: String,
  toks: String,
});
const sec_model = mongoose.model("security", SecuritySchema);

exports.store = async (data) => {
  const newperson = new Ip(data);
  await newperson.save();
};

exports.getdata = async () => {
  const app1 = await Ip.find({});
  return app1;
};

exports.getmodal = async (ip) => {
  const app2 = await Ip.find({ IP: ip });
  return app2;
};

exports.reports_del = async (ip) => {
  const app1 = await Ip.deleteOne({ IP: ip })
    .then(function () {
      console.log("done");
    })
    .catch(function (err) {
      console.log(err);
    });
};

exports.createuser = async (data) => {
  let user = new sec_model(data);
  await user.save();
  return user;
};

exports.getuserAuth = async (uname, password) => {
  let user = await sec_model.find({
    $and: [{ uname: uname }, { paswrd: password }],
  });
  return user;
};
