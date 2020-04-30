const MenuSchema = require("../models/Menu");
const CategorySchema = require("../models/Category");

module.exports = {
  create: (req, res) => {
    MenuSchema.create({
      name: req.body.name,
      detail: req.body.detail,
      price: req.body.price,
      category: req.body.category,
      imageURL: req.file && req.file.path // walaupun file image akan diisi string tetap tulis seperti ini.
    })
      .then((result) => res.json(result))
      .catch((err) => {
        throw err;
      });
  },
  getDataById: (req, res) => {
    MenuSchema.findById(req.params.menuId)
      .then((result) => res.json(result))
      .catch((err) => resjson(err));
  },
  deleteById: (req, res) => {
    MenuSchema.findByIdAndRemove(req.params.menuId)
      .then((result) => res.json(result))
      .catch((err) => res.json(err));
  },
  // editById: (req, res) => {
  //   MenuSchema.findByIdAndUpdate(req.params.menuId).then(result);
  // },
  getAllData: (req, res) => {
    //   cara 1.
    //   MenuSchema.find({}.then(result =>res.json(result)).catch(err =>{throw(err)}))

    // cara 2.
    MenuSchema.find({})
      .populate("category")
      .then((result) => res.json(result))
      .catch((err) => {
        throw err;
      });
  },
};
