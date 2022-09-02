const studentService = require("../../services/studentService")

exports.findAll =  async (req, res, next)=>{
    await studentService.findAll(req, res, next);
}

exports.findById = async (req, res, next)=>{
    await studentService.findById(req, res, next);
}

exports.deleteById = async (req, res, next)=>{
    await studentService.deleteById(req, res, next);
}

exports.updateById = async (req, res, next)=>{
    await studentService.updateById(req, res, next);
}

exports.insertData = async (req, res, next)=>{
    await studentService.insertData(req, res, next);
}

exports.findBySqlQuery = async (req, res, next)=>{
    await studentService.executeQuery(req, res, next);
} 
