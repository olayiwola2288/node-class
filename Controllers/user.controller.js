const { default: mongoose } = require("mongoose");
const user = require("../Model/user.model");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const showWelcome = (req, res) => {
  res.send("Hello node class");
};
const registerUser = (req, res) => {
  // console.log(req.body);
  const newUser = new user(req.body);
  newUser
    .save()
    .then((result) => {
      console.log(result);
    })
    .catch((err) => {
      console.log(err);
    });
};
const deleteUser = (req, res) => {
  console.log(req.params);
  user.deleteOne({ email: req.params.email }).then((result) => {
    console.log(result);
  });
};
const editUser = (req, res) => {
  // console.log(req.params);
  // user.deleteOne({ email: req.params.email })
  // .then((result) => {
  //   console.log(result);
  // });
};

const getAllUsers = (req, res) => {
  res.send({
    name: "User 1",
    email: "user1@gmil.com",
  });
};

// const SignIn = (req, res) => {
//   user
//     .findOne({ email: req.body.email })
//     .then((foundUser) => {
//       if (foundUser) {
//         // User found in the database
//         console.log(foundUser);
//         res.status(200).json({ message: "User found." });
//       } else {
//         // User not found
//         res.status(404).json({ message: "User not found." });
//       }
//     })
//     .catch((err) => {
//       console.error(err);
//       res.status(500).json({ message: "Internal server error." });
//     });
// };

const SignIn = (req, res) => {
  let { email, password } = req.body;
  user
    .findOne({ email: email })
    .then((user) => {
      user.comparedPassword(password, (err, isMatch) => {
        let schoolPortal = process.env.SECRET;
        if (isMatch) {
          jwt.sign(
            { email },
            schoolPortal,
            { expiresIn: "0.5h" },
            (err, token) => {
              if (err) {
                console.log(err);
              } else {
                console.log(token);
                res.send({ status: true, message: "user ", token: token });
              }
            }
          );
        } else {
          res.send({ status: false, message: "user not found" });
        }
      });
      console.log("user found now");
    })
    .catch((err) => {
      console.log("wrong files");
    });
};

const getDashboard = (req, res) => {
  let schoolPortal = process.env.SECRET;
  let token = req.headers.authorization.split(" ")[1];

  console.log(token);

  jwt.verify(token, schoolPortal, (err, decodedToken) => {
    if (err) {
      console.error(err);
      return res.status(401).json({ error: "Unauthorized" });
    } else {
      console.log(decodedToken);
      // Assuming decodedToken contains user data, you can send it back to the client
      return res.status(200).json({ user: decodedToken });
    }
  });
};

module.exports = {
  showWelcome,
  registerUser,
  getAllUsers,
  deleteUser,
  SignIn,
  getDashboard,
};
