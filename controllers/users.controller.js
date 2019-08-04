const User = require('../models/user.model');

module.exports = {
  signUp: async (req, res, next) => {
    res.status(200).json({
      message: 'signUp'
    });
  },
  signIn: async (req, res, next) => {
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
