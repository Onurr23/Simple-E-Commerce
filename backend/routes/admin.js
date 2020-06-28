const router = require('express').Router();
const adminController = require('../controllers/adminController');
const auth = require('../middleware/auth');


router.get('/categories',adminController.getCategories);

router.post('/add-category', auth ,adminController.addCategory);

router.post('/update-category/:id', auth ,adminController.updateCategory);


module.exports = router;