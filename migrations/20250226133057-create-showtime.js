'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('showtimes', {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      film_id: {
        type: Sequelize.INTEGER,
        references: { model: 'films', key: 'id' },
        onDelete: 'CASCADE',
      },
      start_time: { type: Sequelize.DATE, allowNull: false },
      createdAt: { type: Sequelize.DATE, allowNull: false },
      updatedAt: { type: Sequelize.DATE, allowNull: false },
    });
  },
  down: async (queryInterface) => await queryInterface.dropTable('showtimes')
};
