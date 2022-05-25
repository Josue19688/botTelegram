const Sequelize = require('sequelize');
const db = require('../config/db');


const Registros = db.define('T01_registrosColaboradoresVisitas',{
    id:{
        type:Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    numero_gafete:{
        type:Sequelize.STRING,
    },
    sedeOrigen:{
        type:Sequelize.INTEGER
    },
    sedeIngreso:{
        type:Sequelize.INTEGER
    },
    fechaIngreso:{
        type:Sequelize.DATE
    },
    usuario:{
        type:Sequelize.STRING
    },
    id_ultimo_movimiento:{
        type:Sequelize.INTEGER
    },
    accion:{
        type:Sequelize.INTEGER
    }
});

module.exports=Registros;