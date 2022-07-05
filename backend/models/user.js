const mongoose = require("mongoose");

// const urlValidator = require("../utils/urlValidator");

const { validateURL, validateEmail } = require("../middlewares/validations");

const bcrypt = require("bcryptjs");

const UnauthorizedError = require("../errors/unauthorized-error");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: "Jacques Cousteau",
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: "Explorer",
  },
  avatar: {
    type: String,
    validate: {
      validator: validateURL,
      message: "Invalid URL",
    },
    default: "https://pictures.s3.yandex.net/resources/avatar_1604080799.jpg",
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: validateEmail,
      message: "Invalid Email",
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
});

userSchema.statics.findUserByCrendentials = function findUserByCrendentials(
  email,
  password
) {
  return this.findOne({ email })
    .select("+password")
    .then((user) => {
      if (!user) {
        return Promise.reject(new UnauthorizedError("Incorrent data"));
      }
      // user found
      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          // the hashes didn't match, rejecting the promise
          return Promise.reject(new UnauthorizedError("Incorect data"));
        }
        return user;
      });
    });
};

module.exports = mongoose.model("user", userSchema);
