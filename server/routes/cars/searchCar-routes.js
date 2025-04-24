const express = require("express");
const { searchcar } = require("../../controllers/Cars/search-controller");

const router = express.Router();

router.get("/:keyword", searchcar);

module.exports = router;
