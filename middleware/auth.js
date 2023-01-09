const jwt = require("jsonwebtoken");
const secret = "$%#@###$%$RWER#$R#@#@#WWEWQWWDSSDFWR#$%%^&^%^";

module.exports = (req, res, next) => {
 try {const token = req.headers.authorization;
  const decoded = jwt.verify(token, secret);

  req.userData = decoded;
  next();}

  catch(e){
    return res.sendStatus(500)
  }
};
