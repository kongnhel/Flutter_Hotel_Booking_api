const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller.js");

// ✅ Login Route
router.post("/login", userController.loginUser);

// ✅ Register Route
router.post("/register", userController.createUser);

// ✅ Get user by ID
router.get("/:id", userController.getUserById);

module.exports = router;
