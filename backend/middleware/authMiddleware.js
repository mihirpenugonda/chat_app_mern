const jwt = require("jsonwebtoken");
const ErrorHandler = require("../utils/errorHandler");
const User = require("../models/user");

exports.isAuthenticatedUser = async (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return next(new ErrorHandler(401, "Please Login to access this resource"));
  }

  try {
    const decodedData = jwt.verify(token, process.env.TOKEN_KEY);

    req.user = await User.findById(decodedData.id);

    next();
  } catch (err) {
    return next(new ErrorHandler(401, "Invalid Signature"));
  }
};
