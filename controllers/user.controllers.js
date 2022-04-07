const User = require("../models/User");
const _ = require("lodash");

// @desc Registering User
// @route POST api/user/register
// @access Public
exports.registerUser = async (req, res, next) => {
  try {
    const user = new User(req.body);
    const token = user.generateAuthToken();
    await user.save();
    return res.header("auth-user", token).json({ token: token, user: user });
  } catch (error) {
    return res.status(400).json({ error: error.message });
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
    const userInfo = _.pick(user, [
      "_id",
      "firstName",
      "lastName",
      "email",
      "msisdn",
      "isAdmin",
    ]);
    return res
      .header("auth-user", token)
      .json({ token: token, user: userInfo });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};
