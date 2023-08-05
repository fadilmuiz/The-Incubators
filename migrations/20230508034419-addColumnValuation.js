'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up (queryInterface, Sequelize) {
    return queryInterface.addColumn("StartUps", "valuation", { type: Sequelize.INTEGER });
  },

  down (queryInterface, Sequelize) {
    
    return queryInterface.dropTable("StartUps");
  }
};
