const redis = require("redis");

let redisClient;
(async () => {
    redisClient = redis.createClient();
    redisClient.on("error", (error) => console.error(`Redis Error : ${error}`));
    redisClient.on("end", () => console.log("Redis connection closed"));
    redisClient.on("connect", () => console.log("Redis connection open"));
    await redisClient.connect();
})();

module.exports = redisClient;