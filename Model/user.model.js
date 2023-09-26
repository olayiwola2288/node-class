const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
let userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
});
let salRound = 10;
userSchema.pre("save", function (next) {
  bcrypt
    .hash(this.password, salRound)
    .then((hash) => {
      this.password = hash;
      console.log(hash);
      next();
    })
    .catch((err) => console.log(err));
});

userSchema.methods.comparedPassword = function (userPassword, callback) {
  bcrypt.compare(userPassword, this.password, (err, isMatch) => {
    if (err) {
      return callback(err);
    } else if (!isMatch) {
      return callback(null, isMatch);
    } else {
      return callback(null, this);
    }
  });
};
let user = mongoose.model("myUser", userSchema);
module.exports = user;
