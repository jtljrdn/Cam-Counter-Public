const { Sequelize } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(
  process.env.SEQEULIZE_DB,
  process.env.SEQUELIZE_USER,
  process.env.SEQUELIZE_PASS,
  {
    host: process.env.SEQUELIZE_HOST,
    dialect: "sqlite",
    logging: false,
    // SQLite only
    storage: "database.sqlite",
  }
);

const Count = sequelize.define("Count", {
  value: {
    type: Sequelize.INTEGER,
    defaultValue: 0, // Initial value for the count
    allowNull: false,
  },
});

// export count and sequelize
module.exports = { Count, sequelize };
