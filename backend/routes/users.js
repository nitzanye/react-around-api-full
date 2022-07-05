const express = require("express");

const router = express.Router();

const {
  validateAuthRequest,
  validateUserdId,
} = require("../middlewares/validations");

const {
  getUsers,
  getUserById,
  getCurrentUserData,
  updateUser,
  updateUserAvatar,
} = require("../controllers/users");

router.get("/users", validateAuthRequest, getUsers);

router.get("/users/me", validateAuthRequest, getCurrentUserData);

router.get("/users/:userId", validateAuthRequest, validateUserdId, getUserById);

// router.post('/users', createUser);

router.patch("/users/me", validateAuthRequest, updateUser);

router.patch("/users/me/avatar", validateAuthRequest, updateUserAvatar);

module.exports = router;
