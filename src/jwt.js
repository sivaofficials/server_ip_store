const jwt = require("jsonwebtoken");
const secret = "Clincal";

exports.getNewtoks = (uname) => {
  try {
    // console.log(uname);
    token = jwt.sign({ uname: uname }, secret);
    // console.log(jwt.verify(token, secret));
  } catch (err) {
    const error = new Error("Error! Something went wrong.");
    console.log(error);
    return 0;
  }
  // console.log(token);
  return token;
};

exports.dectoks = (token) => {
  // console.log(token);
  try {
    const decodedToken = jwt.verify(token, secret);
    return decodedToken.uname;
  } catch (error) {
    return "error";
  }
};

//
