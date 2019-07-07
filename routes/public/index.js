//public route
const express = require("express");
const router = express.Router();

router.use('/db_entry', require('./db_entry'));

module.exports = router;
