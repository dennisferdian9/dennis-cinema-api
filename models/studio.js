const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('Studio', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    location: { type: DataTypes.STRING },
  }, {
    tableName: 'studios',
    timestamps: true,
    underscored: true,
  });
};
