const mysql = require('mysql');
const config = require('./config/config.json');
const env = process.env.NODE_ENV;
const MYSQL_CONF = config[env];
const errLogger = require('../config/logger');
// 创建连接对象
// const connection = mysql.createConnection(MYSQL_CONF);
// 创建连接池
const pool = mysql.createPool(MYSQL_CONF);
// 开始连接mysql
// connection.connect();

/**
 * @description 创建sql统一执行的方法
 * @param {*} sql
 * @returns
 */
function mysql_query(sql) {
	return new Promise((resolve, reject) => {
		pool.getConnection((error, connection) => {
			if (error) {
				errLogger.error(error);
				reject(error);
				return;
			}
			connection.query(sql, (err, res) => {
				if (err) {
					errLogger.error(err);
					reject(err);
				} else {
					resolve(res);
				}
				connection.release();
			});
		});
	});
}

module.exports = { mysql_query, escape: mysql.escape };
