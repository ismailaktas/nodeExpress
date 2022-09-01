const models = require("../../models/students");

exports.studentsAll =  async (req, res, next)=>{

    models.student.findAll().then(student => {
        res.json(student)
    }).catch(next);
    
}

/* exports.students =  async (req, res, next)=>{
    studentSrvc.getDbConn()
    resultMsg1 = studentSrvc.getDbConn;
    await res.json({
        "message": "DbConn: "+resultMsg1
    })
} */

exports.student = async (req, res, next)=>{
    const id = await req.params.id;
    res.status(200).json({
        "id": id
    });
}