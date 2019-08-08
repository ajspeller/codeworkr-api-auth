const passport = require('passport');
const { Strategy: JwtStrategy } = require('passport-jwt');
const { ExtractJwt } = require('passport-jwt');
const { Strategy: LocalStragety } = require('passport-local');

const { JWT_SECRET } = require('./config');
const User = require('./models/user.model');

passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromHeader('authorization'),
      secretOrKey: JWT_SECRET
    },
    async (payload, done) => {
      try {
        // find the user specified in the token
        const user = await User.findById(payload.sub);
        if (!user) {
          return done(null, false);
        }
        done(null, user);
      } catch (error) {
        done(error, false);
      }
    }
  )
);

passport.use(
  new LocalStragety(
    {
      usernameField: 'email',
      passwordField: 'password'
    },
    async (email, password, done) => {
      try {
        const user = await User.findOne({ email });
        if (!user) {
          return done(null, false);
        }

        const isMatch = await user.isValidPassword(password);
        console.log(password);
        console.log(isMatch);

        if (!isMatch) {
          return done(null, false);
        }
        done(null, user);
      } catch (error) {
        done(error, false);
      }
    }
  )
);
