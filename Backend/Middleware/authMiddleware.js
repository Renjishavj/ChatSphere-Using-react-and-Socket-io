const jwt = require("jsonwebtoken");
const User = require("../Models/UserModel");
const asyncHandler = require("express-async-handler");

const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Extract the token from the Authorization header
      token = req.headers.authorization.split(" ")[1];

      // Decode the token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Fetch the user associated with the token from the database
      req.user = await User.findById(decoded.id).select("-password");

      // Continue with the next middleware or route handler
      next();
    } catch (error) {
      // If there's an error during token verification
      res.status(401);
      throw new Error("Not authorized, token failed");
    }
  }

  // If no token is provided in the headers
  if (!token) {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
});

module.exports = { protect }
