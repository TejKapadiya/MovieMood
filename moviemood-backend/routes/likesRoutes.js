const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const { addToLikelist, removeFromLikelist,getlikelist } = require("../controllers/likesController");

const router = express.Router();

router.get("/", protect, getlikelist);
router.post("/:movieId", protect, addToLikelist);
router.delete("/:movieId", protect, removeFromLikelist);

module.exports = router;
