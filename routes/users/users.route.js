const express = require("express")
const userController = require("../../controller/users/users.controller");

const router = express.Router();

router.post("/create", userController.addUsers);

module.exports = router;