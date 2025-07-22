const User = require("../models/User");

exports.getWatchlist = async (req, res) => {
    const user = await User.findById(req.user._id).populate("watchlist");
    res.status(200).json(user.watchlist);
};

exports.addToWatchlist = async (req, res) => {
    const user = await User.findById(req.user._id);
    if (!user.watchlist.includes(req.params.movieId)) {
        user.watchlist.push(req.params.movieId);
        await user.save();
    }
    res.status(200).json({ message: "Added to watchlist" });
};

exports.removeFromWatchlist = async (req, res) => {
    const user = await User.findById(req.user._id);
    user.watchlist = user.watchlist.filter((id) => id.toString() !== req.params.movieId);
    await user.save();
    res.status(200).json({ message: "Removed from watchlist" });
};
