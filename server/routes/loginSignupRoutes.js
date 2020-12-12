const {Router} = require('express'); 
const loginSignupController = require('../controllers/loginSignupController')

const router = Router();

router.post('/login', loginSignupController.login);

router.post('/signup', loginSignupController.signup);

router.get('/logout', loginSignupController.logout);

module.exports = router;