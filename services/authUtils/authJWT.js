const jwt = require('jsonwebtoken')
const config = require('config');
module.exports = new class AuthJWT {
    constructor(){
    }
    async verifyToken(req, res, next) {
        const authHeader = req.headers.authorization;
        if (authHeader) {
            const token = authHeader.split(' ')[1];
            jwt.verify(token, process.env.SECRET || config.SECRET, (err, user) => {
                if (err) {
                    return res.send({ message:'you are not logged in '});
                }
                req.user = user;
                next();
            });
        } 
        else {
            res.send({ message:'you are not autherized'});
        }
    }
    async generateToken(user) {
        return jwt.sign({ userID: user._id,role:user.role}, process.env.SECRET || config.SECRET, {expiresIn: "1d"}); 
    }
    async IsOnboarder(req,res, next){
        if(req.user.role === 'onboarder'){
            next();
        }
        else{
            return res.send({ message:'you are not autherized'});
        }
    }


}
