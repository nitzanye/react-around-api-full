const jwt = require("jsonwebtoken");

const UnauthorizedError = require("../errors/unauthorized-error");

const { NODE_ENV, JWT_SECRET } = process.env;

const extractBearerToken = (header) => {
  return header.replace("Bearer ", "");
};

const auth = (req, res, next) => {
  // getting authorization from the header
  const { authorization } = req.headers;

  if (!authorization || !authorization.startWith("Bearer ")) {
    return next(new UnauthorizedError("Authorization required"));
  }

  const token = extractBearerToken(authorization);
  let payload;

  try {
    payload = jwt.verify(
      token,
      NODE_ENV === "production" ? JWT_SECRET : "some-secret-key"
    );
  } catch (err) {
    return next(new UnauthorizedError("Authorization required"));
  }

  req.user = payload; //assigning the payload to the request object

  next(); //sending the request to the next middleware
};

module.exports = { auth };
