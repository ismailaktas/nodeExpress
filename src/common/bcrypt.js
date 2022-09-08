const bcrypt = require("bcrypt");
const saltRounds = 12;
const strPrefix = "prefix";

exports.hashStringSync = (strOriginal) => {
    return bcrypt.hashSync(`${strPrefix}${strOriginal}`, saltRounds);
}

exports.compareStringSync = (strOriginal, strHashed) => {
    return bcrypt.compareSync(`${strPrefix}${strOriginal}`, strHashed);
}