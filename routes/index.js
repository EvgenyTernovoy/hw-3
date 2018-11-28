const express = require('express');
const indexController = require('../controllers/index');
const loginController = require('../controllers/login');
const adminController = require('../controllers/admin');

const router = express.Router();


router.get('/', indexController.get);
router.post('/', indexController.post);

router.get('/login', loginController.get);
router.post('/login', loginController.postAuthorization);

router.get('/admin', adminController.get);
router.post('/admin/skills', adminController.updateSkills);
router.post('/admin/upload', adminController.uploadProduct);

module.exports = router;
