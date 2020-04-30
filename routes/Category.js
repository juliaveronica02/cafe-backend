const express = require("express");
const router = express.Router();
const Category = require("../Controllers/Category");

router.get("/show", Category.getAllCategory);
router.post("/create", Category.create);

module.exports = router;
