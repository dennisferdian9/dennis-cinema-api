const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('Showtime', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    film_id: { type: DataTypes.INTEGER, allowNull: false },
    start_time: { type: DataTypes.DATE, allowNull: false },
    end_time: { type: DataTypes.DATE },
  }, {
    tableName: 'showtimes',
    timestamps: true,
    underscored: true,
  });
};
