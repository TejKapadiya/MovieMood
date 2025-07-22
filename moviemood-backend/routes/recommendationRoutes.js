// routes/recommendationRoutes.js
const express = require("express");
const { getRecommendations, getGuestRecommendations } = require("../controllers/recommendationController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", protect, getRecommendations); // Personalized recommendations
router.get("/guest", getGuestRecommendations); // Guest recommendations

module.exports = router;
