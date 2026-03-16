const express = require("express");
const router = express.Router();

const groupController = require("../controllers/group.controller");
const protect = require("../middleware/auth.middleware");


router.post("/", protect, groupController.createGroup);

router.get("/", protect, groupController.getGroups);

router.get("/:id", protect, groupController.getGroupById);

router.post("/:id/join", protect, groupController.joinGroup);


module.exports = router;