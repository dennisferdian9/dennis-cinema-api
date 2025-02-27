const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('Ticket', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    showtime_id: { type: DataTypes.INTEGER, allowNull: false },
    seat_number: { type: DataTypes.STRING, allowNull: false },
    price: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
  }, {
    tableName: 'tickets',
    timestamps: true,
    underscored: true,
  });
};
