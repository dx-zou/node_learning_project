const dayjs = require('dayjs');

/**
 * 获取最近一段时间的起始结束时间范围
 * @param  {Number} value [时间戳]
 * @return {String}
 */
const formatDate = (value = new Date().getTime()) => {
	return dayjs(value).format('YYYY-MM-DD HH:mm:ss');
};
/**
 * 获取最近一段时间的起始结束时间范围
 * @param  {Number} value [最近的多少秒,默认最近一天]
 * @param  {Boolean} type [向前还是向后取范围, true向后 false向前]
 * @return {Array}       [起始时间，结束时间]
 */
const getDateRange = (value = 86400, type = true) => {
	const stamp = type
		? new Date().getTime() + value * 1000
		: new Date().getTime() - value * 1000;
	const t = formatDate(stamp);
	const k = formatDate();
	// 开始时间
	const startTime = type ? k : t;
	// 结束时间
	const endTime = type ? t : k;
	return [startTime, endTime];
};

module.exports = {
	getDateRange,
	formatDate,
};
