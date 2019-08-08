
const promiseRouter = require('express-promise-router');
const passport = require('passport');

const userController = require('../controllers/users.controller');
const { validateBody, schemas } = require('../helpers/route.helpers');
require('../passport');

const router = promiseRouter();

router
  .route('/signup')
  .post(validateBody(schemas.authSchema), userController.signUp);

router
  .route('/signin')
  .post(
    validateBody(schemas.authSchema),
    passport.authenticate('local', { session: false }),
    userController.signIn
  );

router
  .route('/secret')
  .get(passport.authenticate('jwt', { session: false }), userController.secret);

module.exports = router;
