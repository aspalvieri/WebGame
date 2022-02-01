const express = require("express");
const router = express.Router();
const auth = require("../middleware/authorize");

//Controller
const charactersController = require("../controllers/charactersController");

//Routes
router.get("/", auth, charactersController.index);

module.exports = router;
