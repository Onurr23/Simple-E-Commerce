const router = require('express').Router();
const userController = require('../controllers/userController');
const auth = require('../middleware/auth');

router.post('/signup',userController.signupUser);

router.post('/signin',userController.signinUser);

router.get('/user',auth,userController.getUser);

router.get('/profile/:id',auth,userController.getProfile);

router.post('/cart/:id',auth,userController.updateCart);

router.post('/user/update/:id',auth,userController.updateUser)


module.exports = router;