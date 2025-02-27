'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('films', {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      title: { type: Sequelize.STRING, allowNull: false },
      genre: { type: Sequelize.STRING },
      duration: { type: Sequelize.INTEGER },
      studio_id: {
        type: Sequelize.INTEGER,
        references: { model: 'studios', key: 'id' },
        onDelete: 'SET NULL',
      },
      createdAt: { type: Sequelize.DATE, allowNull: false },
      updatedAt: { type: Sequelize.DATE, allowNull: false },
    });
  },
  down: async (queryInterface) => await queryInterface.dropTable('films')
};
