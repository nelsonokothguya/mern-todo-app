const JWT = require ('jsonwebtoken');

//secret key

const secretKey = "nelson";

const checkAuthentication = (req, res, next) => {
    try {
      const token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, secret);
      req.userData = decoded;
      next();
    } catch (error) {
      return res.status(401).json({
        message: 'Auth failed'
      });
    }
  };
  