const express = require("express");

const router = express.Router();

const {
  authValidation,
  cardValidationId,
  newCardValidation,
} = require("../middlewares/validations");

const {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require("../controllers/cards");

router.get("/cards", authValidation, getCards);

router.post("/cards", authValidation, newCardValidation, createCard);

router.delete("/cards/:cardId", authValidation, cardValidationId, deleteCard);

router.put("/cards/:cardId/likes", authValidation, cardValidationId, likeCard);

router.delete(
  "/cards/:cardId/likes",
  authValidation,
  cardValidationId,
  dislikeCard
);

module.exports = router;
