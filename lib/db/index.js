const Sequelize = require('sequelize');

// Initialize
const sequelize = new Sequelize({
    dialect: 'sqlite',
    logging: false,
    storage: './database.db'
});

// Models
const db = {};
const Chzzk = require('./chzzk');

db.sequelize = sequelize;
db.Chzzk = Chzzk;

Chzzk.init(sequelize);

Chzzk.associate(db);

module.exports = db;