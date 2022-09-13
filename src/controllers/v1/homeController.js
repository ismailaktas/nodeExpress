exports.home = (req, res, next)=>{
    console.log(process.env);
    res.send("NodeExpress Restfull Api:  App Name:" + process.env.APP_TITLE + " -- Host: " + process.env.HOSTNAME + " -- VERSION: " + process.env.API_VERSION);
}