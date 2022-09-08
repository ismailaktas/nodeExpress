const jwt = require("jsonwebtoken");

exports.jwtSign = (strId, strUserName, strPassword, strSecretKey) => {
    const token = jwt.sign({id: strId, username: strUserName, password: strPassword}, strSecretKey, {expiresIn: "2h"}); // 2 saat expire
    return token;
}

exports.jwtVerify = (strToken, strSecretKey) => {
    const verifyToken = jwt.verify(strToken, strSecretKey);
    return verifyToken;
}