const Sequelize = require('sequelize');
const db = require('../config/db');


const Solicitud = db.define('T03_solicitud',{
    id_solicitud:{
        type:Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    id_division:{
        type:Sequelize.INTEGER,
    },
    id_depto:{
        type:Sequelize.INTEGER
    },
    id_tipo:{
        type:Sequelize.INTEGER
    },
    fecha_opera:{
        type:Sequelize.DATE
    },
    sede:{
        type:Sequelize.STRING
    },
    nombre_solicita:{
        type:Sequelize.STRING
    },
    puesto:{
        type:Sequelize.STRING
    },
    ub_soporte:{
        type:Sequelize.STRING
    },
    autoriza:{
        type:Sequelize.STRING
    },
    ext:{
        type:Sequelize.INTEGER
    },
    estado:{
        type:Sequelize.INTEGER
    },
    descripcion:{
        type:Sequelize.STRING
    },
    correo:{
        type:Sequelize.STRING
    },
    autorizacion:{
        type:Sequelize.INTEGER
    },
    asigno:{
        type:Sequelize.STRING
    },
    fecha_sol:{
        type:Sequelize.DATE
    }

});

module.exports=Solicitud;