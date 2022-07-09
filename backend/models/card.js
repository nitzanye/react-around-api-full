const mongoose = require("mongoose");
// const { validateUrl } = require("../middlewares/validations");

// const urlValidator = require('../utils/urlValidator');

// const { validateUrl } = require("../middlewares/validations");

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
  link: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        return /^(http:\/\/|https:\/\/)+[?\www]+[^\s]+[\w]?.$/gm.test(v);
      },
      message: "Invalid URL",
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      default: [],
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("card", cardSchema);
