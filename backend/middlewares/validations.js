const express = require("express");

const BodyParser = require("body-parser");

const { celebrate, Joi, errors } = require("celebrate");

const validator = require("validator");

const ObjectId = require("mongoose").Types.ObjectId;

function validateUrl(string) {
  if (!validator.isURL(string)) {
    throw new Error("Invalid URL");
  }
  return string;
}

function validateEmail(string) {
  if (!validator.isEmail(string)) {
    throw new Error("Invalid Email");
  }
  return string;
}

// const validateUrl = (value, helpers) => {
//   if (validator.isURL(value)) {
//     return value;
//   }
//   return helpers.message("Invalid link");
// };

// const validateEmail = (value, helpers) => {
//   if (validator.isEmail(value)) {
//     return value;
//   }
//   return helpers.message("Invalid email");
// };

const authValidation = celebrate({
  headers: Joi.object()
    .keys({
      authorization: Joi.string().required(),
    })
    .unknown(true),
});

const validateUser = celebrate({
  body: Joi.object().keys({
    // name: Joi.string().min(2).max(30),
    // about: Joi.string().min(2).max(30),
    // avatar: Joi.string().custom(validateUrl),
    email: Joi.string().required().custom(validateEmail),
    password: Joi.string().required(),
  }),
});

const validateLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().custom(validateEmail),
    password: Joi.string().required(),
  }),
});

const updateUserValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
});

const updateAvatarValidation = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().custom(validateUrl),
  }),
});

const validateUserdId = celebrate({
  params: Joi.object().keys({
    userId: Joi.string().hex().length(24),
  }),
});

const newCardValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().custom(validateUrl),
  }),
});

const cardValidationId = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().hex().length(24),
  }),
});

module.exports = {
  authValidation,
  validateUrl,
  validateEmail,
  validateUser,
  validateLogin,
  updateUserValidation,
  updateAvatarValidation,
  validateUserdId,
  newCardValidation,
  cardValidationId,
};

// const validateObjectId = (value, helpers) => {
//   if (ObjectId.isValid(value)) {
//     return value;
//   }
//   return helpers.message("Invalid User ID");
// };

// const cardValidationId = celebrate({
//   params: Joi.object().keys({
//     cardId: Joi.string().required().custom(validateObjectId),
//   }),
// });

// const validateUserdId = celebrate({
//   params: Joi.object().keys({
//     userId: Joi.string().required().custom(validateObjectId),
//   }),
// });
