//public route
const express = require("express");
const router = express.Router();

router.use('/all_routes', require('./all_routes'));

module.exports = router;
