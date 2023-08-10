const jwt = require("jsonwebtoken");
const User = require("../model/userModel");

const protect = (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    try {
      token = req.headers.authorization.split(" ")[1];

      // Decodes token id
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      User.findById(decoded.id)
        .select("-password")
        .then(user => {
          if (!user) {
            res.status(401);
            throw new Error("Not authorized, token failed");
          }

          req.user = user;
          next();
        })
        .catch(error => {
          res.status(401);
          throw new Error("Not authorized, token failed");
        });
    } catch (error) {
      res.status(401);
      throw new Error("Not authorized, token failed");
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
};

module.exports = { protect };
