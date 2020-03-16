const router = require('express').Router();
const { AuthUtils , Multer } = require ('../../../services')
const { UserController } = require('../../../controllers')

//user Login
router.post('/login', UserController.login)
//user dashboard 
router.get('/dashboard', [AuthUtils.AuthJWT.verifyToken], UserController.dashboard)
//user update profile
router.patch('/updateprofile', [AuthUtils.AuthJWT.verifyToken, Multer.Multer.upload], UserController.updateProfile);
//Get users
router.get('/getUser', [AuthUtils.AuthJWT.verifyToken, AuthUtils.AuthJWT.IsOnboarder], UserController.getUser)
//crate new user
router.post('/addUser', [AuthUtils.AuthJWT.verifyToken, AuthUtils.AuthJWT.IsOnboarder, Multer.Multer.upload], UserController.addUser)
// patch any user
router.patch('/updateuser', [AuthUtils.AuthJWT.verifyToken, Multer.Multer.upload, AuthUtils.AuthJWT.IsOnboarder], UserController.updateUser)

module.exports = router;