'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class users extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
		}
	}
	users.init(
		{
			id: {
				type: DataTypes.INTEGER,
				allowNull: false,
				primaryKey: true,
				autoIncrement: true,
			},
			userName: {
				type: DataTypes.STRING,
				allowNull: false,
				unique: true,
				get() {
					// 获取器
					const rawValue = this.getDataValue('userName');
					return rawValue ? rawValue.toUpperCase() : null;
				},
			},
			realName: {
				type: DataTypes.STRING,
			},
			fullName: {
				// 虚拟列
				type: DataTypes.VIRTUAL,
				get() {
					return `${this.userName}-${this.realName}`;
				},
			},
			password: {
				type: DataTypes.STRING,
				allowNull: false,
				// set(value) {
				// 设置器
				// 	this.setDataValue('password', value)
				// },
			},
			company: {
				type: DataTypes.STRING,
			},
		},
		{
			sequelize,
			timestamps: true,
			modelName: 'users',
		}
	);
	return users;
};
