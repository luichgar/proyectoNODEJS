const sequelize = require('sequelize');
const connection = require('../config/db');

const Plane = connection.define('plane',{
    id :{
        type: sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    registration_number: {
        type: sequelize.STRING,
        allowNull: false
    },
    airline: {
        type: sequelize.STRING,
        allowNull: false
    }, 
    passenger_capacity: {
        type: sequelize.INTEGER,
        allowNull: false
    }, 
    plane_status: {
        type: sequelize.STRING,
        allowNull: false,
        defaultValue: "ready"
    }, 
    out_of_service:{
        type: sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
    }
})


module.exports = Plane;