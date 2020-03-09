const router = require('express').Router();
const authenticateJWT = require ('../../../middleware/authenticateJWT')
var UserController = require('../../../controllers')
const multer = require('multer')

const storage = multer.diskStorage({
    destination: function(req,file,cb) {
        cb(null, './uploads')
    },
    filename:function(req,file,cb) {
        cb(null, Date.now().toString() + file.originalname )
    }
})
const upload = multer({storage : storage})
// get user picture 

//user Login
router.post('/login', UserController.UserController.login)
//user update profile
router.patch('/updateprofile', UserController.UserController.updateProfile)
//Get all user
router.get('/getUser', authenticateJWT.authenticateJWT, UserController.UserController.getUser)
//crate new user

router.post('/addUser', authenticateJWT.authenticateJWT,upload.single('profilePhoto'), UserController.UserController.addUser)
// patch any user
router.patch('/updateuser', authenticateJWT.authenticateJWT, UserController.UserController.updateUser)
//register User
//router.post('/user/post', UserController.addUsers)


module.exports = router;