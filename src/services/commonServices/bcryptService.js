const bcrypt = require("bcrypt");
const saltRounds = 10; 

//Sync
exports.hashStringSync = (strOriginal) => {
    return bcrypt.hashSync(strOriginal, saltRounds);
}

exports.compareStringSync = (strOriginal, strHashed) => {
    return bcrypt.compareSync(strOriginal, strHashed);
}

//Async
exports.hashStringAsync = (strOriginal) => {
    return bcrypt.hash(strOriginal, saltRounds);
}

exports.compareStringAsync = (strOriginal, strHashed) => {
    return bcrypt.compare(strOriginal, strHashed);
}