'use strict';
module.exports = (sequelize, DataTypes) => {
  const Server = sequelize.define('Server', {
    domain: DataTypes.STRING,
    registration: DataTypes.DATE,
    expiration: DataTypes.DATE,
    IdPackage: DataTypes.INTEGER,
    price: DataTypes.DOUBLE,
    status: DataTypes.STRING,
    IdUser: DataTypes.INTEGER
  }, {});
  Server.associate = function(models) {
    // associations can be defined here
  };
  return Server;
};