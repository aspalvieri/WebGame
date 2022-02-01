const express = require("express");
const router = express.Router();
const auth = require("../middleware/authorize");

//Controller
const charactersController = require("../controllers/charactersController");

//Routes
router.get("/", auth, charactersController.index);
router.get("/findBattle", auth, charactersController.findBattle);
router.get("/getBattle", auth, charactersController.getBattle);
router.get("/attack", auth, charactersController.attack);

module.exports = router;
