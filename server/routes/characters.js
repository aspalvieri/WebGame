const express = require("express");
const router = express.Router();
const auth = require("../middleware/authorize");

//Controller
const charactersController = require("../controllers/charactersController");

//Routes
router.get("/", auth, charactersController.getCharacter);
router.post("/battle", auth, charactersController.findBattle);
router.get("/battle", auth, charactersController.getBattle);
router.post("/attack", auth, charactersController.attack);
router.post("/stats", auth, charactersController.spendPoint);

module.exports = router;
