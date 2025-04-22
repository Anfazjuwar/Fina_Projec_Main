const express = require("express");

const { protect } = require("../../middleware/authMiddleware");
const {
  allMessages,
  sendMessage,
} = require("../../controllers/Chat/messageControllers");
// const {
//   allMessages,
//   sendMessage,
// } = require("../controllers/messageControllers");
// const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.route("/:chatId").get(protect, allMessages);
router.route("/").post(protect, sendMessage);

module.exports = router;
