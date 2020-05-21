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
    },
    {
      domain: 'legamio.com',
      registration: "2019-05-09 00:00:00",
      expiration: "2021-05-09 00:00:00",
      price: '200000',
      status: 'Active',
      IdPackage: 4,
      IdUser: 4,
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ]);
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
