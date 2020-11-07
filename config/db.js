// 环境参数
const ENV = process.env.NODE_ENV;

let MYSQL_CONF, REDIS_CONF;
if (ENV === 'development') {
	MYSQL_CONF = {
		host: 'localhost',
		user: 'root',
		password: 'mySql2020',
		port: '3306',
		database: 'my_blog',
	};

	REDIS_CONF = {
		host: 'localhost',
		port: '6379',
	};
}
if (ENV === 'production') {
	MYSQL_CONF = {
		host: 'localhost',
		user: 'root',
		password: 'mySql2020',
		port: '3306',
		database: 'my_blog',
	};
	REDIS_CONF = {
		host: 'localhost',
		port: '6379',
	};
}

module.exports = {
	MYSQL_CONF,
	REDIS_CONF,
};
