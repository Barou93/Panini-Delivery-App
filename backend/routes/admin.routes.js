const router = require('express').Router();

const authController = require('../controllers/auth.controller');

const adminController = require('../controllers/admin.controller');
const uploadController = require('../controllers/upload.controller');
const upload = require('../middleware/upload.middleware');
//Authentification

router.post('/register', authController.register);
router.post('/login', authController.login);
router.put('/forgot-password', authController.changePassword);

router.post('/logout', authController.logout);

//Admin Panel
router.get('/:id', adminController.adminInfos);
//router.put('/:id', adminController.updateProfil);
router.delete('/:id', adminController.deleteAdmin);

//Upload File

router.post('/:id/upload', upload.single('profil'), uploadController.uploadProfil);




module.exports = router;