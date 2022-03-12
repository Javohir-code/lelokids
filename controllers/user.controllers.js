const User = require("../models/User");
const _ = require("lodash");

// @desc Registering User
// @route POST api/user/register
// @access Public
exports.registerUser = async (req, res, next) => {
  try {
    const user = new User(req.body);
    await user.save();
    return res.status(201).send(user);
  } catch (error) {
    return res.status(400).send("Unable to add a user", error);
  }
};

// @desc Login User
// @route POST api/user/login
// @access Public
exports.loginUser = async (req, res, next) => {
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );
    const token = user.generateAuthToken();
    const userInfo = _.pick(user, ["_id", "name", "email", "isAdmin"]);
    return res
      .header("auth-user", token)
      .json({ token: token, user: userInfo });
  } catch (error) {
    return res.status(400).send("Password or Email is not valid");
  }
};

