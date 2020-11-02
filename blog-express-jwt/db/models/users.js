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
			userName: DataTypes.STRING,
			realName: DataTypes.STRING,
			password: DataTypes.STRING,
		},
		{
			sequelize,
			timestamps: false,
			modelName: 'users',
		}
	);
	return users;
};
