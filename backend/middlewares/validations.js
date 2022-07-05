const express = require("express");

const BodyParser = require("body-parser");

const { celebrate, Joi, errors } = require("celebrate");

const validator = require("validator");

const ObjectId = require("mongoose").Types.ObjectId;

const validateURL = (value, helpers) => {
  if (validator.isURL(value)) {
    return value;
  }
  return helpers.error("string.uri");
};

const validateEmail = (value, helpers) => {
  if (validator.isEmail(value)) {
    return value;
  }
  return helpers.error("string.uri");
};

const validateObjectId = (value, helpers) => {
  if (ObjectId.isValid(value)) {
    return value;
  }
  return helpers.message("validation Error");
};

const validateAuthRequest = celebrate({
  headers: Joi.object()
    .keys({
      authorization: Joi.string().required(),
    })
    .unknown(true),
});

const validateUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().required().custom(validateURL),
    email: Joi.string().required().custom(validateEmail),
    password: Joi.string().required(),
  }),
});

const validateUserdId = celebrate({
  params: Joi.object().keys({
    userId: Joi.string().required().custom(validateObjectId),
  }),
});

const validateLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().custom(validateEmail),
    password: Joi.string().required(),
  }),
});

const validateCard = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    link: Joi.string().custom(validateURL),
  }),
});

const validateCardId = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().required().custom(validateObjectId),
  }),
});

module.exports = {
  validateAuthRequest,
  validateURL,
  validateEmail,
  validateUser,
  validateUserdId,
  validateLogin,
  validateCard,
  validateCardId,
};
