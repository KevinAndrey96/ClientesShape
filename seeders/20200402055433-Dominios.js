'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Domains', [{
      name: 'instanceshape.com',
      registration: new Date(),
      expiration: new Date(),
      price: '36500',
      status: 'Active',
      ns1: 'ns1.instanceshape.com',
      ns2: 'ns2.instanceshape.com',
      ns3: 'ns3.instanceshape.com',
      ns4: 'ns4.instanceshape.com',
      IdUser: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      name: 'arengapp.tk',
      registration: new Date(),
      expiration: new Date(),
      price: '40500',
      status: 'Active',
      ns1: 'ns1.instanceshape.com',
      ns2: 'ns2.instanceshape.com',
      ns3: 'ns3.instanceshape.com',
      ns4: 'ns4.instanceshape.com',
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
