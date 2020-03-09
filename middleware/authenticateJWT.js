const accessTokenSecret = 'RBK_TOKEN';
const jwt = require('jsonwebtoken');
module.exports = {
    async authenticateJWT(req, res, next) {
        const authHeader = req.headers.authorization;

        if (authHeader) {
            const token = authHeader.split(' ')[1];

            jwt.verify(token, accessTokenSecret, (err, user) => {
                if (err) {
                    return res.send({
                        message: 'you are not autherized '
                    });
                }

                req.user = user;
                next();
            });
        } else {
            res.send({
                message: 'you are not logged in '
            });
        }
    }

}