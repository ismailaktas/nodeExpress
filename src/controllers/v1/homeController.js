exports.home = (req, res, next)=>{
    console.log(process.env);
    res.send("Home & Index -- " + process.env.APP_TITLE + " " + process.env.HOSTNAME + " -- VERSION: " + process.env.API_VERSION);
}