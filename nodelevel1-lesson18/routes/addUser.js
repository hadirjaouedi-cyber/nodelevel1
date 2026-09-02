const express = require('express');
const router = express.Router();
const User = require("../models/customerschema");
const userController = require("../controllers/userController");
const moment = require('moment');
router.get("/add.html", userController.user_add_get)

router.post("/add.html",userController.user_post);
module.exports = router;