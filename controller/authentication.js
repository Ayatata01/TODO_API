const User = require("../models/user");
const Authentication = require("../helper/authentication");
const bcrypt = require("bcrypt");
// User.sync();
exports.Login = async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  const user = {
    email: email,
  };

  const token = Authentication.CreateToken(user);

  const userData = await User.findOne({
    where: {
      email: email,
    },
  });

  if (userData) {
    if (bcrypt.compare(password, userData.password)) {
      res.status(200).json({
        token,
      });
    } else {
      res.json({
        message: "password mismatch",
      });
    }
  } else {
    res.json({
      message: "email is not found",
    });
  }
};

exports.Register = async (req, res, next) => {
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;

  const hashedPassword = await bcrypt.hash(password, 10);

  SaveData = {
    username: username,
    email: email,
    password: hashedPassword,
  };

  const userData = await User.findOne({
    where: {
      email: email,
    },
  });

  if (!userData) {
    User.create(SaveData)
      .then((result) => {
        res.status(201).json({
          username,
          email,
        });
      })
      .catch((err) => res.json({ err }));
  } else {
    res.status(404).json({
      message: "Email has been used",
    });
  }
};
