'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('tickets', {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      showtime_id: {
        type: Sequelize.INTEGER,
        references: { model: 'showtimes', key: 'id' },
        onDelete: 'CASCADE',
      },
      seat_number: { type: Sequelize.STRING, allowNull: false },
      price: { type: Sequelize.DECIMAL(8, 2), allowNull: false },
      createdAt: { type: Sequelize.DATE, allowNull: false },
      updatedAt: { type: Sequelize.DATE, allowNull: false },
    });
  },
  down: async (queryInterface) => await queryInterface.dropTable('tickets')
};
