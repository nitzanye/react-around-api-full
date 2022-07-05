const express = require("express");

const app = express();

const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/aroundb", {
  useNewUrlParser: true,
});

// app.use(express.json());

const helmet = require("helmet");

const bodyParser = require("body-parser");

app.use(bodyParser.json());

const { PORT = 3000 } = process.env;

const { createUser, login } = require("./controllers/users");

const { pageNotFound } = require("./controllers/page-not-found");

const auth = require("./middlewares/auth");

const { requestLogger, errorLogger } = require("./middlewares/logger");

const {
  validateAuthRequest,
  validateUser,
  validateLogin,
} = require("./middlewares/validations");

const serverErrorHandler = require("./middlewares/server-error-handler");

const userRouter = require("./routes/users");

const cardsRouter = require("./routes/cards");

const { errors } = require("celebrate");

app.use(helmet());

// app.use((req, res, next) => {
//   req.user = {
//     _id: '6291ee6e8a309062867b0274',
//   };
//   next();
// });

// must come before the route handlers
app.use(requestLogger);

// register and login
app.post("/signup", validateAuthRequest, validateUser, createUser);
app.post("/signin", validateAuthRequest, validateLogin, login);

// authorization
app.use(auth);

app.use("/", userRouter);
app.use("/", cardsRouter);

// must come after the route handlers and before the error handlers
app.use(errorLogger);

// celebrate error handler
app.use(errors());

// centralized error handler
app.use(serverErrorHandler);

app.get("*", pageNotFound);

// app.get("*", (req, res) => {
//   res.status(404).send({ message: "Requested resource not found" });
// });

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
