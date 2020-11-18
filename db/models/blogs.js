'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class blogs extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
		}
	}
	blogs.init(
		{
			title: DataTypes.STRING,
			content: DataTypes.STRING(3000),
			author: DataTypes.STRING,
			userId: DataTypes.INTEGER,
			isTop: {
				type: DataTypes.INTEGER,
				defaultValue: 1,
			},
			isDelete: {
				type: DataTypes.INTEGER,
				defaultValue: 1,
			},
		},
		{
			sequelize,
			tableName: 'blog',
			modelName: 'blogs',
			createdAt: 'createTime',
			updatedAt: 'updateTime',
		}
	);
	return blogs;
};
