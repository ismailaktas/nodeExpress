const redis = require("redis");

let redisClient;
(async () => {
    redisClient = redis.createClient();
    redisClient.on("error", (error) => console.error(`Redis Error : ${error}`));
    redisClient.on("end", () => console.log("Redis connection closed"));
    redisClient.on("connect", () => console.log("Redis connection open"));
    await redisClient.connect();
})();

setKey = async (keyName, value, expireSecond = 10) =>{
    await redisClient.set(keyName, value);
    await redisClient.expire(keyName, expireSecond);
}

getKey = async(keyName) =>{
    return await redisClient.get(keyName);
}

module.exports = {redisClient, setKey, getKey};