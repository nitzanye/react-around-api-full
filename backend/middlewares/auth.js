const jwt = require("jsonwebtoken");

const handleAuthError = (res) => {
  res.status(401).send({ message: "Authorization required" });
};

const extractBearerToken = (header) => {
  return header.replace("Bearer ", "");
};

module.exports = (req, res, next) => {
  // getting authorization from the header
  const { authorization } = req.headers;

  if (!authorization || !authorization.startWith("Bearer ")) {
    return handleAuthError(res);
  }

  const token = extractBearerToken(authorization);
  let payload;

  try {
    payload = jwt.verify(token, "some-secret-key");
  } catch (err) {
    return handleAuthError(res);
  }

  req.user = payload; //assigning the payload to the request object

  next(); //sending the request to the next middleware
};
