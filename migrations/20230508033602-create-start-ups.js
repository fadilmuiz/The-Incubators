'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.createTable('StartUps', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      startUpName: {
        type: Sequelize.STRING
      },
      founderName: {
        type: Sequelize.STRING
      },
      dateFound: {
        type: Sequelize.DATE
      },
      educationOfFounder: {
        type: Sequelize.STRING
      },
      roleOfFounder: {
        type: Sequelize.STRING
      },
      IncubatorId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Incubators',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL' //hapus
        
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down(queryInterface, Sequelize) {
    return queryInterface.dropTable('StartUps');
  }
};