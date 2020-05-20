'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Servers', [{
      domain: 'instanceshape.com',
      registration: new Date(),
      expiration: new Date(),
      price: '70000',
      status: 'Active',
      IdPackage: 1,
      IdUser: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      domain: 'arengapp.tk',
      registration: new Date(),
      expiration: new Date(),
      price: '90000',
      status: 'Active',
      IdPackage: 1,
      IdUser: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  }
};
