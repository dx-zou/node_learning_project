const redis = require('redis');
const config = require('../config/redis');
const env = process.env.NODE_ENV;
const { port, host } = config[env];
const redisClient = redis.createClient(port, host);

redisClient.on('error', err => {
	console.error(err);
});

module.exports = redisClient;
