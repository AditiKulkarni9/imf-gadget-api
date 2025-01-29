const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const { v4: uuidv4 } = require('uuid');

const Gadget = sequelize.define('Gadget', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: uuidv4,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  codename: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('Available', 'Deployed', 'Destroyed', 'Decommissioned'),
    defaultValue: 'Available',
  },
  decommissionedAt: {
    type: DataTypes.DATE,
    allowNull: true,
  },
});

module.exports = Gadget;
