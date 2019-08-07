const User = require('../models/user.model');

module.exports = {
  signUp: async (req, res, next) => {
    const { email, password } = req.value.body;

    const userFound = await User.findOne({ email });
    if (userFound) {
      return res.status(403).json({
        message: 'User already exists'
      });
    }

    const newUser = User({
      email,
      password
    });

    const user = await newUser.save();
    res.status(200).json({
      message: 'user created',
      user
    });
  },
  signIn: async (req, res, next) => {
    // generate token
    res.status(200).json({
      message: 'signIn'
    });
  },
  secret: async (req, res, next) => {
    res.status(200).json({
      message: 'secret'
    });
  }
};
