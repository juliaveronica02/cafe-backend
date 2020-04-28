const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const newMenuSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  detail: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
});
module.exports = mongoose.model("menu", newMenuSchema);
// menu adalah nama tabel, jadi newMenuSchema daftarnya akan disimpan dalam menu.
