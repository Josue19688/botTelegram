const Sequelize = require('sequelize');
const db = require('../config/db');


const Asistencias = db.define('asistencia',{
    id:{
        type:Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    codigo:{
        type:Sequelize.INTEGER,
    },
    nombre:{
        type:Sequelize.STRING
    },
    alias:{
        type:Sequelize.STRING
    },
    fecha:{
        type:Sequelize.DATE
    }
});

module.exports=Asistencias;