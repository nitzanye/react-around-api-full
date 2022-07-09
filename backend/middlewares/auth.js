const jwt = require("jsonwebtoken");
const { NODE_ENV, JWT_SECRET } = process.env;
const UnauthorizedError = require("../errors/unauthorized-error");

// const extractBearerjwt = (header) => {
//   return header.replace("Bearer ", "");
// };

const auth = (req, res, next) => {
  // getting authorization from the header
  const { authorization } = req.headers;

  if (!authorization || !authorization.startWith("Bearer ")) {
    return next(new UnauthorizedError("You are not authorized"));
  }

  let payload;
  // const token = extractBearerjwt(authorization);
  const token = authorization.replace("Bearer ", "");
  try {
    payload = jwt.verify(
      token,
      NODE_ENV === "production" ? JWT_SECRET : "some-secret-key"
    );
  } catch (err) {
    return next(new UnauthorizedError("You are not authorized"));
  }

  req.user = payload; //assigning the payload to the request object

  return next(); //sending the request to the next middleware
};

module.exports = auth;
