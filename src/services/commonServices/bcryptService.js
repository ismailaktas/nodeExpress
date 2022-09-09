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
exports.hashStringAsync = async (strOriginal) => {
    return await bcrypt.hash(strOriginal, saltRounds);
}

exports.compareStringAsync = async (strOriginal, strHashed) => {
    return await bcrypt.compare(strOriginal, strHashed);
}