const Sequelize = require('sequelize');

class Chzzk extends Sequelize.Model {
    static init(sequelize) {
        super.init({
            user_id: {
                type: Sequelize.STRING,
                allowNull: false,
                unique: true
            },
            live_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
            }
        }, {
            sequelize,
            modelName: 'Chzzk',
            tableName: 'chzzk_live'
        });
    }

    static associate(db) {}
}

module.exports = Chzzk;