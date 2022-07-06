const express = require("express");

const app = express();

const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/aroundb", {
  useNewUrlParser: true,
});

// app.use(express.json());

const helmet = require("helmet");

const bodyParser = require("body-parser");

let cors = require("cors");

app.use(bodyParser.json());

require("dotenv").config();

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

app.use(cors());

//enable requests for all routes
app.options("*", cors());

// must come before the route handlers
app.use(requestLogger);

// server crash testing
app.get("/crash-test", () => {
  setTimeout(() => {
    throw new Error("Server will crash now");
  }, 0);
});

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

app.use("*", pageNotFound);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
