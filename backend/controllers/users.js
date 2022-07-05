const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { SUCCESS_OK } = require("../utils/constants");
const NotFoundError = require("../errors/not-found-error");
const InvalidDataError = require("../errors/invalid-data-error");
const ConflictError = require("../errors/conflict-error");
// const user = require("../models/user");

const SALT_ROUNDS = 10;

const getUsers = (req, res, next) => {
  User.find({})
    .orFail(new NotFoundError("Data is not found"))
    .then((users) => res.status(SUCCESS_OK).send(users))
    .catch(next);
};

const getUserById = (req, res, next) => {
  User.findById(req.params.userId)
    .orFail(new NotFoundError("Data is not found"))
    .then((user) => res.status(SUCCESS_OK).send(user))
    .catch((err) => {
      if (err.name === "CastError") {
        next(new InvalidDataError("Invalid data"));
      } else {
        next(err);
      }
    });
};

const getCurrentUserData = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(new NotFoundError("Data is not found"))
    .then((user) => res.status(SUCCESS_OK).send(user))
    .catch(next);
};

const createUser = (req, res, next) => {
  const { name, about, avatar, email, password } = req.body;

  User.findOne({ email })
    .then((user) => {
      if (user) {
        throw new ConflictError("This email is already exist");
      } else {
        return bcrypt.hash(password, SALT_ROUNDS);
      }
    })
    .then((hash) => {
      User.create({ name, about, avatar, email, password: hash })
        .then((user) => {
          res.status(SUCCESS_OK).send({
            name: user.name,
            about: user.about,
            avatar: user.avatar,
            email: user.email,
          });
        })
        .catch((err) => {
          if (err.name === "ValidationError") {
            next(new InvalidDataError("Invalid data"));
          }
        });
    })
    .catch(next);
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCrendentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, "some-secret-key", {
        expiresIn: "7d",
      });
      res.send({ token });
    })
    .catch(next);
};

const updateUser = (req, res, next) => {
  const currentUser = req.user._id;
  const { name, about } = req.body;
  User.findByIdAndUpdate(
    { _id: currentUser },
    { name, about },
    { new: true, runValidators: true }
  )
    .orFail(new NotFoundError("Data is not found"))
    .then((user) => res.status(SUCCESS_OK).send(user))
    .catch((err) => {
      if (err.name === "ValidationError") {
        next(new InvalidDataError("Invalid data"));
      } else if (err.name === "CastError") {
        next(new InvalidDataError("Invalid data"));
      } else {
        next(err);
      }
    });
};

const updateUserAvatar = (req, res, next) => {
  const currentUser = req.user._id;
  const { avatar } = req.body;
  User.findByIdAndUpdate(
    { _id: currentUser },
    { avatar },
    { new: true, runValidators: true }
  )
    .orFail(new NotFoundError("Data is not found"))
    .then((user) => res.status(SUCCESS_OK).send(user))
    .catch((err) => {
      if (err.name === "ValidationError") {
        next(new InvalidDataError("Invalid data"));
      } else if (err.name === "CastError") {
        next(new InvalidDataError("Invalid data"));
      } else {
        next(err);
      }
    });
};

module.exports = {
  getUsers,
  getUserById,
  getCurrentUserData,
  createUser,
  login,
  updateUser,
  updateUserAvatar,
};

// const login = (req, res, next) => {
//   const { email, password } = req.body;
//   return User.findOne({ email })
//     .select("+password")
//     .then((user) => {
//       if (!user) {
//         // user with the given email not found
//         // fire the catch with err
//         return Promise.reject(new Error("Incorrent data"));
//       }
//       // user found
//       return bcrypt.compare(password, user.password);
//     })
//     .then((matched) => {
//       if (!matched) {
//         // the hashes didn't match, rejecting the promise
//         return Promise.reject(new Error("Incorect data"));
//       }
//       // successful authentication
//       // send token instead of message
//       //we're creating a token
//       const token = jwt.sign({ _id: user._id }, "some-secret-key", {
//         expiresIn: "7d",
//       });

//       // we return the token in the response body
//       res.send({ token });
//     })
//     .catch((err) => {
//       // return an authentication error
//       res.status(AUTENTICATION_ERROR).send({ message: err.message });
//     });
// };

// const getUsers = (req, res) => {
//   User.find({})
//     .orFail()
//     .then((users) => res.status(SUCCESS_OK).send(users))
//     .catch((err) => {
//       if (err.name === "DocumentNotFoundError") {
//         res.status(ERROR_NOT_FOUND).send({ message: "Data is not found" });
//       } else {
//         res
//           .status(INTERNAL_SERVER_ERROR)
//           .send({ message: "An error has occurred on the server" });
//       }
//     });
// };

// const getUserById = (req, res) => {
//   User.findById(req.params.userId)
//     .orFail()
//     .then((user) => res.status(SUCCESS_OK).send(user))
//     .catch((err) => {
//       if (err.name === "DocumentNotFoundError") {
//         res.status(ERROR_NOT_FOUND).send({ message: "Data is not found" });
//       } else if (err.name === "CastError") {
//         res.status(ERROR_INVALID_DATA).send({ message: "NotValid Data" });
//       } else {
//         res
//           .status(INTERNAL_SERVER_ERROR)
//           .send({ message: "Internal Server Error" });
//       }
//     });
// };

// const getCurrentUserData = (req, res) => {
//   User.findById(req.user._id)
//     .orFail()
//     .then((user) => res.status(SUCCESS_OK).send(user))
//     .catch((err) => {
//       if (err.name === "DocumentNotFoundError") {
//         res.status(ERROR_NOT_FOUND).send({ message: "Data is not found" });
//       } else if (err.name === "CastError") {
//         res.status(ERROR_INVALID_DATA).send({ message: "NotValid Data" });
//       } else {
//         res
//           .status(INTERNAL_SERVER_ERROR)
//           .send({ message: "Internal Server Error" });
//       }
//     });
// };

// const createUser = (req, res) => {
//   // const { name, about, avatar } = req.body;
//   bcrypt
//     .hash(req.body.password, SALT_ROUNDS)
//     .then((hash) =>
//       User.create({
//         email: req.body.email,
//         password: hash,
//         name: req.body.name,
//         about: req.body.about,
//         avatar: req.body.avatar,
//       })
//     )
//     .then((user) => res.status(SUCCESS_OK).send({ user }))
//     .catch((err) => {
//       if (err.name === "ValidationError") {
//         res.status(ERROR_INVALID_DATA).send({ message: "Invalid data" });
//       } else {
//         res
//           .status(INTERNAL_SERVER_ERROR)
//           .send({ message: "Internal Server Error" });
//       }
//     });
// };

// const login = (req, res) => {
//   const { email, password } = req.body;
//   return User.findOne({ email })
//     .select("+password")
//     .then((user) => {
//       if (!user) {
//         // user with the given email not found
//         // fire the catch with err
//         return Promise.reject(new Error("Incorrent data"));
//       }
//       // user found
//       return bcrypt.compare(password, user.password);
//     })
//     .then((matched) => {
//       if (!matched) {
//         // the hashes didn't match, rejecting the promise
//         return Promise.reject(new Error("Incorect data"));
//       }
//       // successful authentication
//       // send token instead of message
//       //we're creating a token
//       const token = jwt.sign({ _id: user._id }, "some-secret-key", {
//         expiresIn: "7d",
//       });

//       // we return the token in the response body
//       res.send({ token });
//     })
//     .catch((err) => {
//       // return an authentication error
//       res.status(AUTENTICATION_ERROR).send({ message: err.message });
//     });
// };

// const createUser = (req, res) => {
//   const { name, about, avatar } = req.body;
//   User
//     .create({ name, about, avatar })
//     .then((user) => res.status(SUCCESS_OK).send({ user }))
//     .catch((err) => {
//       if (err.name === 'ValidationError') {
//         res.status(ERROR_INVALID_DATA).send({ message: 'Invalid data' });
//       } else {
//         res.status(INTERNAL_SERVER_ERROR).send({ message: 'Internal Server Error' });
//       }
//     });
// };

// const updateUser = (req, res) => {
//   const currentUser = req.user._id;
//   const { name, about } = req.body;
//   User.findByIdAndUpdate(
//     { _id: currentUser },
//     { name, about },
//     { new: true, runValidators: true }
//   )
//     .orFail()
//     .then((user) => res.status(SUCCESS_OK).send(user))
//     .catch((err) => {
//       if (err.name === "DocumentNotFoundError") {
//         res.status(ERROR_NOT_FOUND).send({ message: "Data is not found" });
//       } else if (err.name === "CastError") {
//         res.status(ERROR_INVALID_DATA).send({ message: "NotValid Data" });
//       } else {
//         res
//           .status(INTERNAL_SERVER_ERROR)
//           .send({ message: "Internal Server Error" });
//       }
//     });
// };

// const updateUserAvatar = (req, res) => {
//   const currentUser = req.user._id;
//   const { avatar } = req.body;
//   User.findByIdAndUpdate(
//     { _id: currentUser },
//     { avatar },
//     { new: true, runValidators: true }
//   )
//     .orFail()
//     .then((user) => res.status(SUCCESS_OK).send(user))
//     .catch((err) => {
//       if (err.name === "DocumentNotFoundError") {
//         res.status(ERROR_NOT_FOUND).send({ message: "Data is not found" });
//       } else if (err.name === "CastError") {
//         res.status(ERROR_INVALID_DATA).send({ message: "NotValid Data" });
//       } else {
//         res
//           .status(INTERNAL_SERVER_ERROR)
//           .send({ message: "Internal Server Error" });
//       }
//     });
// };
