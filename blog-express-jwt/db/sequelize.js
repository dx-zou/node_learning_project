const Sequelize = require("sequelize");
const { MYSQL_CONF } = require("../conf/db");
const { database, user, password, host, port } = MYSQL_CONF;
const sequelize = new Sequelize(database, user, password, {
  host,
  port,
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});
const blogs = sequelize.define(
  "blogs",
  {
    id: {
      type: Sequelize.NUMBER,
      primaryKey: true
    },
    title: {
      type: Sequelize.STRING
    },
    content: {
      type: Sequelize.STRING
    },
    createTime: {
      type: Sequelize.BIGINT
    },
    author: {
      type: Sequelize.STRING
    },
    isTop: {
      type: Sequelize.NUMBER
    },
    isDelete: {
      type: Sequelize.NUMBER
    }
  },
  {
    timestamps: false,
    freezeTableName: true
  }
);

module.exports = {
  blogs
};
