const Sequelize = require('sequelize');
const db = require('../config/db');


const BitacoraSolicitud = db.define('T01_bitadoraSolicitudSoporte',{
    id:{
        type:Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    id_solicitud:{
        type:Sequelize.INTEGER,
    },
    usuario:{
        type:Sequelize.STRING
    },
    fecha_cambio:{
        type:Sequelize.DATE
    },
    accion:{
        type:Sequelize.STRING
    }
});

module.exports=BitacoraSolicitud;