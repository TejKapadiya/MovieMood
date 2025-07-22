const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const { addToWatchlist, removeFromWatchlist, getWatchlist } = require("../controllers/watchlistController");

const router = express.Router();

router.get("/", protect, getWatchlist);
router.post("/:movieId", protect, addToWatchlist);
router.delete("/:movieId", protect, removeFromWatchlist);

module.exports = router;
