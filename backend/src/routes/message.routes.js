const express = require("express");
const router = express.Router();

const messageController = require("../controllers/message.controller.js");
const protect = require("../middleware/auth.middleware.js");


router.get(
    "/private/:userId",
    protect,
    messageController.getPrivateMessages
);

router.get(
    "/group/:groupId",
    protect,
    messageController.getGroupMessages
);


module.exports = router;