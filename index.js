
process.env.NTBA_FIX_319 = 1;
const TelegramBot = require('node-telegram-bot-api');
const fs = require('fs');




const leerJson = fs.readFileSync('usuarios.json','utf-8');
let mensajes =Array.from(JSON.parse(leerJson));



///"dev":"nodemon bot.js",
//const token = '2145537077:AAGudtb06BBzj5-L6aSCqwCU0FazL4bOGX0';
const token = '5351040426:AAFGM1YN-SfAuQcgBMsz_tdrA-6p8OYQUuI';
const bot = new TelegramBot(token, {polling:true});

bot.on('polling_error', function(error){
    console.log(error);
});


////comando para iniciar nuestro bot 
bot.onText(/^\/start/, function(msg){
    var chatId = msg.chat.id;
    var nameUser = msg.from.first_name;
    
    bot.sendMessage(chatId, "Bienvenido a mi bot " + nameUser);
});

bot.onText(/^\/chatid/, (msg) => {
    const chatId = msg.chat.id;//aqui tenemos el id del chat que nos devuelve el bot
    bot.sendMessage(chatId, "El id de este chat es: " + chatId);  
});

bot.onText(/^\/myid/, (msg) => {
    const chatId = msg.chat.id;
    const myId = msg.from.id;
    bot.sendMessage(chatId, "Tu id es: " + myId);  
});



/**
 * CON ESTE METODO CAPTURAMOS LA ASISTENCIA DE LOS PARTICIPANTES DONDE TRAEREMOS EL ID DE TELEGRAM,
 * NOMBRE DE USUARIO, ALIAS Y FECHA CUANDO DA CLICK EN EL BOTON QUE SE LE MUESTRA EN EL CHAT
 */


bot.onText(/^\/asistencia/,function(msg){
    var chatId=msg.chat.id;

    const leerAsistencia = fs.readFileSync('asistencia.json','utf-8');
    let asistencia = Array.from(JSON.parse(leerAsistencia));

    
    var botones = {
        reply_markup:{
            inline_keyboard:[
                [
                    {text:"Asistencia",callback_data:'boton1'}
                    
                ]
            ]
        }
    };

    bot.sendMessage(chatId,"Marcar asistencia",botones);

   
    bot.on('callback_query',function onCallbackQuery(accionboton){
        const data = accionboton.data;
       
        

        let fecha = accionboton.message.date;
        var dt = new Date(fecha*1000); 
        var nuevaFecha = dt.getHours() + ':' + dt.getMinutes() + ':' + dt.getSeconds() + ' -- ' + dt;
        if(data=='boton1'){
            
        const myId = accionboton.from.id;
        const nombre = accionboton.from.first_name;
        const alias = accionboton.from.username;
        let nuevo ={
             myId,
             nombre,
             alias,
             nuevaFecha
        };


        asistencia.push(nuevo);
        const json_asistencia = JSON.stringify(asistencia);
        fs.writeFileSync('asistencia.json',json_asistencia,'utf-8');


            bot.answerCallbackQuery(accionboton.id, {text: 'Asistencia agregada correctamente', show_alert: true});
        }

       
    })
})


/**
 * HAREMOS UN METODO PARA SABER QUE USUARIOS HAN REGISTRADO SU ASISTENCIA
 */

bot.onText(/^\/myasistencia/,function(msg){

    var chatId=msg.chat.id;
    

    const leerAsistencia = fs.readFileSync('asistencia.json','utf-8');
    let asistencia = Array.from(JSON.parse(leerAsistencia));

    const nuevoArreglo = asistencia.map(function(item){
        const id = msg.from.id;
      
        if(item.myId===id){
            const fecha = item.nuevaFecha.toString();
            return `<b>ID</b>: <i>${item.myId}</i> \n <b>NOMBRE</b><i> ${item.nombre}</i> \n <b>ALIAS</b> : <i>${item.alias}</i> \n <b>FECHA </b>: <i>${fecha}</i> \n\n`;
        }
        
    })
    bot.sendMessage(chatId,nuevoArreglo.toString(),{parse_mode : "HTML"});

});








