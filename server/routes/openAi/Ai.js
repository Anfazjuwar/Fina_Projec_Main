const express = require("express");
const AiController = require("../../controllers/OpenAi/AiController");
const router = express.Router();

router.post("/chat", AiController);

module.exports = router;
