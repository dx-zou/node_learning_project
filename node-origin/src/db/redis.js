const redis = require("redis");
const { REDIS_CONF } = require("../conf/db");
const { port, host } = REDIS_CONF;
const redisClient = redis.createClient(port, host);

redisClient.on("error", err => {
  console.error(err);
});

function setRedis(key, value) {
  if (typeof value === "object") {
    value = JSON.stringify(value);
  }
  redisClient.set(key, value, redis.print);
}

function getRedis(key) {
  return new Promise((resolve, reject) => {
    redisClient.get(key, (err, val) => {
      if (err) {
        reject(err);
        return;
      }
      if (val === null) {
        resolve(null);
        return;
      }
      try {
        resolve(JSON.parse(val));
      } catch (error) {
        resolve(error);
      }
    });
  });
}

module.exports = {
  getRedis,
  setRedis
};
