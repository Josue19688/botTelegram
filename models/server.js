
const { engine } = require('express-handlebars');
const express = require('express');
const cors = require('cors'); 
const path = require('path');

const { botTelegram } = require('./bot');
const router = require('../routes/bot.routes');
class Server{
    constructor(){
        this.app= express();
        this.port=3000;


        //middlewares
        this.middlewares();

        this.app.use('/',router);
    
    }

    middlewares(){
        
        botTelegram();
        this.app.use(express.json());
        this.app.use(cors({origin:true,credentials:true}));
      

        
        this.app.use(express.static(path.join(__dirname,'public')));
        this.app.engine('handlebars', engine());
        this.app.set('view engine', 'handlebars');
        this.app.set('views', './views');

    }

    
      
    listen(){
        this.app.listen(this.port,()=>{
            console.log('Servidor corriendo en el puerto : ',this.port);
        })
    }
}


module.exports=Server;