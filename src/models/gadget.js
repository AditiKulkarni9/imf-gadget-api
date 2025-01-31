const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Gadget = sequelize.define('Gadget', {
    id: {
        type: DataTypes.UUID,
        defaultValue: Sequelize.literal('gen_random_uuid()'),
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    codename: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    status: {
        type: DataTypes.ENUM('Available', 'Destroyed','Decomissioned'),
        defaultValue: 'Available'
    },
    decommissionedAt: {
        type: DataTypes.DATE,
        allowNull: true
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('NOW()')
    },
    updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('NOW()')
    }
}, {
    tableName: 'gadgets',
    timestamps: true
});

module.exports = Gadget;
