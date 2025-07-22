// routes/userRoutes.js
const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const { isAdmin } = require("../middleware/roleMiddleware");
const { getUsers,getUserReviews, updateUserRole, updateUserProfile, deleteUser } = require("../controllers/userController");

const router = express.Router();

router.get("/", protect, isAdmin, getUsers);
router.get("/reviews/:id", protect, getUserReviews);
router.put("/:id", protect, isAdmin, updateUserRole);
router.put("/profile/:id", updateUserProfile); // ✅ Protect middleware ensures only logged-in users can update
router.delete("/:id", protect, isAdmin, deleteUser);

module.exports = router;
