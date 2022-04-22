const Sequelize = require('sequelize');
const db = require('../config/db');


const Finalizadas = db.define('T03_soli_asignada',{
    id_asignada:{
        type:Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    id_tecnico:{
        type:Sequelize.INTEGER,
    },
    id_solicitud:{
        type:Sequelize.STRING
    },
    estado:{
        type:Sequelize.INTEGER
    },
    fecha_signada:{
        type:Sequelize.DATE
    },
    accion:{
        type:Sequelize.STRING
    },
    dificultad:{
        type:Sequelize.STRING
    },
    hora_in:{
        type:Sequelize.STRING
    },
    hora_fin:{
        type:Sequelize.STRING
    },
    fecha_operada:{
        type:Sequelize.DATE
    }
});

module.exports=Finalizadas;