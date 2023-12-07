const Sequelize = require("sequelize");

const sequelize = require("../utils/database");

const Expense = sequelize.define("Expense", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },

  amount: {
    type: Sequelize.DOUBLE,
    allowNull: false,
  },

  description: {
    type: Sequelize.STRING,
    allowNull: false,
  },

  catagory: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = Expense;
