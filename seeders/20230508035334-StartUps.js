'use strict';

const fs = require('fs')
/** @type {import('sequelize-cli').Migration} */
const data = JSON.parse(fs.readFileSync("./data/startup.json", "utf-8")).map(el => {
  delete el.id
  el.createdAt = new Date()
  el.updatedAt = new Date()
  return el
})
module.exports = {
  up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('StartUps', data)
  },

  down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('StartUps', null, {})
  }
};
