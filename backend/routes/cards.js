const express = require("express");

const router = express.Router();

const {
  validateAuthRequest,
  validateCardId,
  validateCard,
} = require("../middlewares/validations");

const {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require("../controllers/cards");

router.get("/cards", validateAuthRequest, getCards);

router.post("/cards", validateAuthRequest, validateCard, createCard);

router.delete(
  "/cards/:cardId",
  validateAuthRequest,
  validateCardId,
  deleteCard
);

router.put(
  "/cards/:cardId/likes",
  validateAuthRequest,
  validateCardId,
  likeCard
);

router.delete(
  "/cards/:cardId/likes",
  validateAuthRequest,
  validateCardId,
  dislikeCard
);

module.exports = router;
