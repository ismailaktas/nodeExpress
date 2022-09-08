const service = require("../../services/modelServices/userService")

exports.findAll =  async (req, res, next)=>{
    await service.findAll(req, res, next);
}

exports.findById = async (req, res, next)=>{
    await service.findById(req, res, next);
}

exports.deleteById = async (req, res, next)=>{
    await service.deleteById(req, res, next);
}

exports.updateById = async (req, res, next)=>{
    await service.updateById(req, res, next);
}

exports.insertData = async (req, res, next)=>{
    await service.insertData(req, res, next);
}

exports.findBySqlQuery = async (req, res, next)=>{
    await service.executeQuery(req, res, next);
} 

//Login
exports.login = async (req, res, next)=>{
    await service.login(req, res, next);
}