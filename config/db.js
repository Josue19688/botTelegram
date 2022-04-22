
const Sequelize = require('sequelize');


const sequelize = new Sequelize('xxxxx','xxxxx','xxxxx',{
    host:'xxxxxxxx',
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