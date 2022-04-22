const Sequelize = require('sequelize');
const db = require('../config/db');


const Extenciones = db.define('extensiones',{
    id:{
        type:Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    division_depto:{
        type:Sequelize.INTEGER,
    },
    ext:{
        type:Sequelize.STRING
    },
    usuario:{
        type:Sequelize.STRING
    },
    sede:{
        type:Sequelize.STRING
    },
    tipoTelefono:{
        type:Sequelize.STRING
    }
});

module.exports=Extenciones;