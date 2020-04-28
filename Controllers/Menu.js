const MenuSchema = require("../models/Menu");

module.exports = {
  create: (req, res) => {
    MenuSchema.create({
      name: req.body.name,
      detail: req.body.detail,
      price: req.body.price,
      imageUrl: req.file.path, // walaupun file image akan diisi string tetap tulis seperti ini.
    })
      .then((result) => res.json(result))
      .catch((err) => {
        throw err;
      });
  },
  getAllData: (req, res) => {
    //   cara 1.
    //   MenuSchema.find({}.then(result =>res.json(result)).catch(err =>{throw(err)}))

    // cara 2.
    MenuSchema.find({})
      .then((result) => res.json(result))
      .catch((err) => {
        throw err;
      });
  },
};
