'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Domains', {
      id: {
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      registration: {
        type: Sequelize.DATE
      },
      expiration: {
        type: Sequelize.DATE
      },
      ns1: {
        type: Sequelize.STRING
      },
      ns2: {
        type: Sequelize.STRING
      },
      ns3: {
        type: Sequelize.STRING
      },
      ns4: {
        type: Sequelize.STRING
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
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Domains');
  }
};