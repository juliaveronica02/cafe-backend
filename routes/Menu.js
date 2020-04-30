const express = require("express");
const router = express.Router();
const MenuController = require("../Controllers/Menu");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, res, cb) {
    cb(null, "./public/images"); //simpan foto di public images.
  },
  filename: function (req, file, cb) {
    cb(null, new Date().toISOString() + file.originalname); // nama asli saat diupload maka '- (strip)' ditambah dengan tanggal diupload.
    //cb adalah singkatan dari callback.
  },
});
const upload = multer({
  storage: storage,
});

router.post("/create", upload.single("imageUrl"), MenuController.create); // upload.single karena hanya menggunakan satu foto.
router.get("/show", MenuController.getAllData);
router.get("get/:menuId", MenuController.getDataById);
router.delete("/delete/:menuId", MenuController.deleteById);
module.exports = router;
