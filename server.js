

const express = require('express');
const { botTelegram } = require('./bot');


const app = express();

botTelegram();

app.listen(3000,()=>{
    console.log('Servidor Corriendo en el puerto',3000);
})