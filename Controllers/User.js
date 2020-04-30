const Users = require("../models/User");
const Bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const privateKey = "sdhskdnk";
// const passwordValidator = require("password-validator");
// const Schema = new passwordValidator();

module.exports = {
  createData: (req, res) => {
    Users.create({
      email: req.body.email,
      phone: req.body.phone,
      password: req.body.password,
      passwordConfirm: req.body.passwordConfirm,
    })
      .then((result) => {
        if (req.body.password !== req.body.passwordConfirm) {
          res.json("Password undefined!!");
        } else {
          req.body.password == req.body.passwordConfirm;
          res.json(result);
        }
      })
      .catch((err) => {
        throw err;
      });
  },
  getData: (req, res) => {
    Users.find({})
      .then((result) => {
        res.json({ status: "success", data: result });
      })
      .catch((err) => err);
  },
  getDataById: (req, res) => {
    Users.findById(req.params.usersId)
      .then((result) => res.json(result))
      .catch((err) => resjson(err));
  },
  deleteById: (req, res) => {
    Users.findOneAndRemove(req.params.usersId)
      .then((result) => res.json(result))
      .catch((err) => res.json(err));
  },
  editById: (req, res) => {
    Users.findByIdAndUpdate(req.params.usersId).then(result);
  },
  authenticated: function (req, res, next) {
    Users.findOne({
      email: req.body.email,
    })
      .then((responese, err) => {
        if (err) next(err);
        else {
          if (
            responese != null &&
            Bcrypt.compareSync(req.body.password, responese.password)
          ) {
            jwt.sign(
              {
                id: responese._id,
              },
              privateKey,
              { expiresIn: 60 * 60 },
              (err, token) => {
                res.json(token);
              }
            );
          } else {
            res.json({ status: err });
          }
        }
      })
      .catch((err) => {
        throw err;
      });
  },
};
