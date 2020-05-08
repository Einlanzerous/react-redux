const passport = require('passport');
const User = require('../models/user');
const { secret } = require('../creds');
const JwtStategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local');

const localLogin = new LocalStrategy({ usernameField: 'email' }, function (email, password, done) {
  User.findOne({ email: email }, function (err, user) {
    if (err) {
      return done(err);
    } else if (user) {
      user.comparePassword(password, function (err, isMatch) {
        if (err) {
          return done(err);
        } else if (isMatch) {
          return done(null, user);
        } else {
          return done(null, false);
        }
      });
    } else {
      return done(null, false);
    }
  });
});

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: secret
};

const jwtLogin = new JwtStategy(jwtOptions, function (payload, done) {

  // If user exists, return it, otherwise return null
  User.findById(payload.sub, function (err, user) {
    if (err) {
      return done(err, false);
    } else if (user) {
      done(null, user);
    } else {
      done(null, false);
    }
  });
});

passport.use(jwtLogin);
passport.use(localLogin);
