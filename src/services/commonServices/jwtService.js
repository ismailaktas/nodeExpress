const jwt = require("jsonwebtoken");

exports.jwtSign = (strId, strUserName, strFullname, strSecretKey) => {
    const token = jwt.sign({id: strId, username: strUserName, fullname: strFullname}, strSecretKey, {expiresIn: process.env.ACCESS_TOKEN_EXPIRE}); 
    return token;
}

exports.jwtVerify = (strToken, strSecretKey) => {
    const verifyToken = jwt.verify(strToken, strSecretKey);
    return verifyToken;
}