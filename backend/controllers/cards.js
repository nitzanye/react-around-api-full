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

// const getCards = (req, res) => {
//   Card.find({})
//     .orFail()
//     .then((cards) => res.status(SUCCESS_OK).send(cards))
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

// const createCard = (req, res) => {
//   // console.log(req.user._id);
//   // const { name, link } = req.body;
//   Card.create(req.body)
//     .then((newCard) => res.status(SUCCESS_OK).send(newCard))
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

// const deleteCard = (req, res) => {
//   Card.findByIdAndRemove(req.params.cardId)
//     .orFail()
//     .then((card) => res.status(SUCCESS_OK).send(card))
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

// const likeCard = (req, res) => {
//   Card.findByIdAndUpdate(
//     req.params.cardId,
//     { $addToSet: { likes: req.user._id } },
//     { new: true }
//   )
//     .orFail()
//     .then((card) => res.status(SUCCESS_OK).send(card))
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

// const dislikeCard = (req, res) => {
//   Card.findByIdAndUpdate(
//     req.params.cardId,
//     { $pull: { likes: req.user._id } },
//     { new: true }
//   )
//     .orFail()
//     .then((card) => res.status(SUCCESS_OK).send(card))
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
