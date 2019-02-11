const express = require("express");
const router = express.Router();

router.use('/bus', require('./bus'));


module.exports = router;
