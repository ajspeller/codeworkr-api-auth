const promiseRouter = require('express-promise-router');
const userController = require('../controllers/users.controller');

const router = promiseRouter();

router.route('/signup').post(userController.signUp);

router.route('/signin').post(userController.signIn);

router.route('/secret').get(userController.secret);

module.exports = router;
