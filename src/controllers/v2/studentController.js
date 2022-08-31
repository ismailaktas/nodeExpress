
exports.students =  async (req, res, next)=>{
    await res.json({
        "message": "All Students Api " + process.env.API_VERSION
    })
}

exports.student = async (req, res, next)=>{
    const id = await req.params.id;
    res.status(200).json({
        "id": id+" Api Version " + process.env.API_VERSION
    });
}