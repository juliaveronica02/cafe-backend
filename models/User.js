const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Bcrypt = require("bcrypt");
const saltRounds = 6;
// const passwordValidator = require("password-validator");

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 15,
    // validate(value){
    //     if(validator.isEmpty(value)){
    //         throw new Error('Please enter your password!')
    //     }else if(validator.equals(value.toLowerCase(),"password")){
    //         throw new Error('Password is invalid!')
    //     }else if(validator.contains(value.toLowerCase(), "password")){
    //         throw new Error('Password should not contain password!')
    //     }
    // }
  },
});

userSchema.pre("save", function (next) {
  this.password = Bcrypt.hashSync(this.password, saltRounds);
  next();
});
module.exports = mongoose.model("User", userSchema);
