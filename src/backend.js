const db = require("./mongo_connect");
const jwt = require("./jwt");

exports.createNewuser = async (user) => {
  await db.createuser(user);
  return 1;
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
  let uname = jwt.dectoks(toks);
  if (uname == undefined || uname == "None") {
    return 0;
  } else {
    return 1;
  }
};
