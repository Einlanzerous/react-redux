const jwt = require('jwt-simple');
const User = require('../models/user');
const { secret } = require('../creds');

function generateTokenForUser (user) {
  const timestamp = new Date().getTime();

  return jwt.encode({ sub: user.id, iat: timestamp }, secret);
}

exports.signin = function (req, res, next) {
  res.send({ token: generateTokenForUser(req.user) });
};

exports.signup = function (req, res, next) {
  const email = req.body.email;
  const password = req.body.password;

  // Check fields
  if (!email || !password) {
    return res.status(422).send({ error: 'E-mail and password are both required' });
  }

  // Require password length
  if (password.length < 8) {
    return res.status(422).send({ error: 'Passwords must be at least 8 characters long' });
  }

  User.findOne({ email }, function (err, existingUser) {
    if (err) {
      return next(err);
    }

    // Require unique e-mail
    if (existingUser) {
      return res.status(422).send({ error: 'User with this e-mail already exists' });
    }

    // Save user to DB if email not already in use
    const user = new User({
      email,
      password
    });
    user.save(function (err) {
      if (err) {
        return next(err);
      }

      res.json({
        token: generateTokenForUser(user)
      });
    });
  });
};