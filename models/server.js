
const express = require('express');
const cors = require('cors'); 

const { botTelegram } = require('./bot');

class Server{
    constructor(){
        this.app= express();
        this.port=3000;


        //middlewares
        this.middlewares();

        this.routes();
    }

    middlewares(){
        
        botTelegram();
        this.app.use(express.json());
        this.app.use(cors({origin:true,credentials:true}));
        this.app.use(express.static('public'))
    }

    routes(){
        this.app.use('/api/bot',require('../routes/bot.routes'));
    }
    listen(){
        this.app.listen(this.port,()=>{
            console.log('Servidor corriendo en el puerto : ',this.port);
        })
    }
}


module.exports=Server;