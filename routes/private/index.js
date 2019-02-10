const express = require("express");
const router = express.Router();

router.use('/livebus', require('./livebus'));

module.exports = router;
