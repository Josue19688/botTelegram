
const express = require('express');
const cors = require('cors'); 
const path = require('path');

const { botTelegram } = require('./bot');
const {botTelegramInformatica} = require('./botInformatica');
const db = require('../config/db');

require('../models/asignadas');
require('../models/registros');
require('../models/solicitud');
require('../models/bitacoraSolicitudes');
class Server{
    constructor(){
        this.app= express();
        this.port=9000;
        //middlewares
        this.middlewares();
        this.router();
    }

    middlewares(){
        botTelegram();
        botTelegramInformatica();
        db.sync()
            .then(()=>console.log('Conectado a la db'))
            .catch(error=>console.log(error));
        this.app.use(express.json());
        this.app.use(cors({origin:true,credentials:true}));
        this.app.use(express.static(path.join(__dirname,'public')));
    }

    router(){
        this.app.use('/api',require('../routes/bot.routes'));
        this.app.use('/api/usuario',require('../routes/usuario.routes'));
    }
    
    listen(){
        this.app.listen(this.port,()=>{
            console.log('Servidor corriendo en el puerto : ',this.port);
        })
    }
}


module.exports=Server;