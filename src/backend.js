const db = require("./mongo_connect");
const jwt = require("./jwt");

exports.createNewuser = async (user) => {
  console.log(user.toks);
  if (user.toks === "b9da6c51a94b15a4c329734263a9980b") {
    await db.createuser(user);
    return 1;
  } else {
    return 0;
  }
};

exports.auth = async (uname, passwd) => {
  const user = await db.getuserAuth(uname, passwd);
  try {
    // console.log(user.length);
    if (user.length >= 1 || user != undefined || user != "None") {
      let toks = jwt.getNewtoks(user[0].username);
      if (toks == 0) {
        return f;
      } else {
        // console.log(toks);
        return toks;
      }
    } else {
      return "f";
    }
  } catch {
    return "f";
  }
};

exports.checktoks = (toks) => {
  let uval = jwt.dectoks(toks);
  if (uval != "error") {
    return 1;
  } else {
    return 0;
  }
};

exports.createtoks = (name) => {
  let toks = jwt.getNewtoks(name);
  return toks;
};
