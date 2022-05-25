
const Sequelize = require('sequelize');


const sequelize = new Sequelize('digici_full','rescobar','rescobar123',{
    host:'192.168.0.29',
    dialect:'mysql',
    port:'3306',
    operatorAliases:false,
    define:{
        timestamps:false
    },
    pool:{
        max:5,
        min:0,
        acquire:30000,
        idle:10000
    }
});

module.exports = sequelize;

