const { Sequelize, DataTypes } = require('sequelize');
const config = require('../../config/config');

const sequelize = new Sequelize(config.development);

const db = {};

// Import models
db.User = require('../models/user')(sequelize, DataTypes);
db.Category = require('../models/category')(sequelize, DataTypes);
db.Expense = require('../models/expense')(sequelize, DataTypes);

db.Expense.belongsTo(db.Category, { foreignKey: 'category_id', as: 'category' });
db.Category.hasMany(db.Expense, { foreignKey: 'category_id' });

// Sync database (creates tables if not present)
sequelize.sync({ alter: true }) // Updates schema without dropping tables
  .then(() => console.log('Database synchronized'))
  .catch(err => console.error('Error syncing database:', err));

// Assign Sequelize instances
db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
