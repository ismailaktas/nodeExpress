const studentSrvc = require("../../services/studentService")

exports.students =  async (req, res, next)=>{
    const sds = studentSrvc.shorten()
    await res.send(sds);
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