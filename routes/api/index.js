const router = require("express").Router();
const movieRoutes = require("./movies");

// movie routes
router.use("/movies", movieRoutes);

module.exports = router;
