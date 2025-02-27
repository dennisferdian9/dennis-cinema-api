const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('Film', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: { type: DataTypes.STRING, allowNull: false },
    genre: { type: DataTypes.STRING },
    release_date: { type: DataTypes.DATE },
    studio_id: { type: DataTypes.INTEGER, allowNull: false },
  }, {
    tableName: 'films',
    timestamps: true,
    underscored: true,
  });
};
