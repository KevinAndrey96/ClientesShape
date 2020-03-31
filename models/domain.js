'use strict';
module.exports = (sequelize, DataTypes) => {
  const Domain = sequelize.define('Domain', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    name: DataTypes.STRING,
    registration: DataTypes.DATE,
    expiration: DataTypes.DATE,
    ns1: DataTypes.STRING,
    ns2: DataTypes.STRING,
    ns3: DataTypes.STRING,
    ns4: DataTypes.STRING,
    status: DataTypes.STRING,
    IdUser: DataTypes.INTEGER,
  }, {});
  return Domain;
};