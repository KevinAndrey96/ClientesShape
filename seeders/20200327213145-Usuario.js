'use strict';
const crypto = require('crypto');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
      firstName: 'Kevin Andrey',
      lastName: 'Herrera Silva',
      email: 'kaherreras@unal.edu.co',
      phone: '3185563342',
      password: crypto.createHash('sha1').update('123456').digest('hex'),
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      firstName: 'Juan Carlos',
      lastName: 'Salazar',
      email: 'jcsalazar@salazarabogados.com',
      phone: '3124473967',
      password: crypto.createHash('sha1').update('123456').digest('hex'),
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
