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
    },{
      name: 'legamio.com',
      registration: "2018-10-01 12:00:00",
      expiration: "2025-10-01 12:00:00",
      price: '36500',
      status: 'Active',
      ns1: 'ns1.instanceshape.com',
      ns2: 'ns2.instanceshape.com',
      ns3: '',
      ns4: '',
      IdUser: 4,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      name: 'legamio.com.co',
      registration: "2019-05-09 00:00:00",
      expiration: "2025-05-09 00:00:00",
      price: '55000',
      status: 'Active',
      ns1: 'ns1.instanceshape.com',
      ns2: 'ns2.instanceshape.com',
      ns3: '',
      ns4: '',
      IdUser: 4,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      name: 'legamio.co',
      registration: "2019-05-09 00:00:00",
      expiration: "2025-05-09 00:00:00",
      price: '110000',
      status: 'Active',
      ns1: 'ns1.instanceshape.com',
      ns2: 'ns2.instanceshape.com',
      ns3: '',
      ns4: '',
      IdUser: 4,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'conssius.com',
      registration: "2018-10-01 12:00:00",
      expiration: "2025-10-01 12:00:00",
      price: '36500',
      status: 'Active',
      ns1: 'ns1.instanceshape.com',
      ns2: 'ns2.instanceshape.com',
      ns3: '',
      ns4: '',
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
