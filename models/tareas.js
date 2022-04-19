const Sequelize = require('sequelize');
const db = require('../config/db');


const Tareas = db.define('tarea',{
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
    mensaje:{
        type:Sequelize.STRING
    },
    ruta:{
        type:Sequelize.STRING
    }
});

module.exports=Tareas;