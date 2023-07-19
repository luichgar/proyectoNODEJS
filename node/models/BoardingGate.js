const sequelize = require('sequelize');
const connection = require('../config/db');
const Plane = require('./Plane');

const BoardingGate = connection.define('boarding_gate',{
    id :{
        type: sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    code_name: {
        type: sequelize.STRING,
        allowNull: false
    },
    availability: {
        type: sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true
    },
    planeId: {
        type: sequelize.INTEGER,
        allowNull: true
    }
})

Plane.hasOne(BoardingGate,{
    foreignKey: 'id'
});
BoardingGate.belongsTo(Plane,{
    foreignKey: 'planeId'
});


/* BoardingGate.prototype.isEmpty = ()=>{
   if(this.availibity){
        return "Is Empty";
   }
} */

module.exports = BoardingGate;