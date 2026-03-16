const express = require("express");
const router = express.Router();

const userController = require("../controllers/user.controller.js");
const protect = require("../middleware/auth.middleware.js");

router.get("/", protect, userController.getUsers);

router.get("/:id", protect, userController.getUserById);

module.exports = router;