const Card = require("../models/card");
const { SUCCESS_OK } = require("../utils/constants");
const NotFoundError = require("../errors/not-found-error");
const InvalidDataError = require("../errors/invalid-data-error");

const getCards = (req, res, next) => {
  Card.find({})
    .orFail(new NotFoundError("Data is not found"))
    .then((cards) => res.status(SUCCESS_OK).send(cards))
    .catch(next);
};

const createCard = (req, res, next) => {
  // console.log(req.user._id);
  // const { name, link, owener } = req.body;
  Card.create(req.body)
    .then((newCard) => res.status(SUCCESS_OK).send(newCard))
    .catch((err) => {
      if (err.name === "ValidationError") {
        next(new InvalidDataError("Invalid data"));
      } else {
        next(err);
      }
    });
};

const deleteCard = (req, res, next) => {
  Card.findByIdAndRemove(req.params.cardId)
    .orFail(new NotFoundError("Data is not found"))
    .then((card) => res.status(SUCCESS_OK).send(card))
    .catch((err) => {
      if (err.name === "CastError") {
        next(new InvalidDataError("Invalid data"));
      } else {
        next(err);
      }
    });
};

const likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  )
    .orFail(new NotFoundError("Data is not found"))
    .then((card) => res.status(SUCCESS_OK).send(card))
    .catch((err) => {
      if (err.name === "CastError") {
        next(new InvalidDataError("Invalid data"));
      } else {
        next(err);
      }
    });
};

const dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true }
  )
    .orFail(new NotFoundError("Data is not found"))
    .then((card) => res.status(SUCCESS_OK).send(card))
    .catch((err) => {
      if (err.name === "CastError") {
        next(new InvalidDataError("Invalid data"));
      } else {
        next(err);
      }
    });
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};