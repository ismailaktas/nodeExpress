const jwt = require('jsonwebtoken');
const jwtService = require("../services/commonServices/jwtService");

module.exports = (req, res, next) => {
    try {
        /*
            JWT header ile gonderilecek. 
            Format : Bearer 
        */
        const token = req.headers.authorization.split(" ")[1]; // 0=Bearer, 1=Token Degeri
        const decodedToken = jwtService.jwtVerify(token, process.env.SECRET_KEY);
        req.userData = decodedToken;

        next();
    }catch(error) {
        return res.status(401).send({
            success:false,
            message: process.env.MSG_TOKEN_UNVALIDATE            
        });
    }
}
