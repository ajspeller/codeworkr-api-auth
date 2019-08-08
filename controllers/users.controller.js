const JWT = require('jsonwebtoken');

const User = require('../models/user.model');
const { JWT_SECRET } = require('../config');

function signToken(user) {
  return JWT.sign(
    {
      iss: 'ajspeller',
      sub: user.id,
      iat: new Date().getTime(),
      exp: new Date().setDate(new Date().getDate() + 1)
    },
    JWT_SECRET
  );
}

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

    const token = signToken(user);

    res.status(201).json({
      message: 'user created',
      token,
      user
    });
  },
  signIn: async (req, res, next) => {
    // generate token
    const token = signToken(req.user);
    res.status(200).json({
      message: 'signIn',
      token
    });
  },
  secret: async (req, res, next) => {
    res.status(200).json({
      message: 'secret'
    });
  }
};
