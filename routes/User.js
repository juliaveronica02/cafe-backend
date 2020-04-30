const express = require("express");
const router = express.Router();
const userController = require("../Controllers/User");

router.post("/register", userController.createData);
router.post("/login", userController.authenticated);
router.get("/get", userController.getData);
router.get("/get/:usersId", userController.getDataById);
router.delete("/delete/:userId", userController.deleteById);
module.exports = router;
