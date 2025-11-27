const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const { User } = require("../models"); // Sequelize User model

const protect = asyncHandler(async (req, res, next) => {
  try {
    const token = req.cookies.token;
    console.log("COOKIES RECEIVED:", token);

    if (!token) {
      res.status(401);
      throw new Error("Not authorized, please login");
    }

    try {
      const verified = jwt.verify(req.cookies.token, process.env.JWT_SECRET);
      console.log("Verified:", verified);
    } catch (err) {
      console.log("JWT ERROR:", err.message);
    }
    console.log("-----------------------------");
    // get user id from token
    const user = await User.findByPk(verified.id, {
      attributes: { exclude: ["password"] },
    });

    if (!user) {
      res.status(401);
      throw new Error("User Not Found");
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401);
    throw new Error("User Not Found or Invalid Token");
  }
});

module.exports = protect;
