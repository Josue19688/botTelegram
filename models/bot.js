process.env.NTBA_FIX_319 = 1;
const TelegramBot = require('node-telegram-bot-api');
const fs = require('fs');
const https = require('https');
const download = require('download');


const botTelegram = async()=>{
    const token = '5351040426:AAFGM1YN-SfAuQcgBMsz_tdrA-6p8OYQUuI';
    const bot = new TelegramBot(token, {polling:true});

    

    bot.onText(/^\/start/, function(msg){
        var chatId = msg.chat.id;
        var nameUser = msg.from.first_name;
        var alias = msg.from.username;
        console.log(msg);
        bot.sendMessage(chatId, "Bienvenido a mi bot \n" + nameUser+"\n "+alias+"\n COMANDOS :\n  /asistencia \n /myasistencia ");
    });

    bot.on('polling_error', function(error){
        console.log(error);
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

    const leerAsistencia = fs.readFileSync('./data/asistencia.json','utf-8');
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
        fs.writeFileSync('./data/asistencia.json',json_asistencia,'utf-8');


            bot.answerCallbackQuery(accionboton.id, {text: 'Asistencia agregada correctamente', show_alert: true});
        }
       
    })
})



/**
 * HAREMOS UN METODO PARA SABER QUE USUARIOS HAN REGISTRADO SU ASISTENCIA
 */

 bot.onText(/^\/myasistencia/,function(msg){

    var chatId=msg.chat.id;
    

    const leerAsistencia = fs.readFileSync('./data/asistencia.json','utf-8');
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


bot.onText(/^\hola/,function(msg){
    console.log(msg);
})


/**
 * NECESITO CREAR UN METODO PARA TRAER UNA IMAGEN DESDE EL GRUPO DE TELEGRAM
 */

 bot.on('message', (msg) => {
    
    if(msg.photo){
        let foto = msg.photo[2].file_id;
        const url=`https://api.telegram.org/bot5351040426:AAFGM1YN-SfAuQcgBMsz_tdrA-6p8OYQUuI/getFile?file_id=${foto}`;
        https.get(url, res => {
            let data = '';
            res.on('data', chunk => {
              data += chunk;
            });
            res.on('end', () => {
              data = JSON.parse(data);
              let pathFoto = data.result.file_path;
              const urlPath = `https://api.telegram.org/file/bot5351040426:AAFGM1YN-SfAuQcgBMsz_tdrA-6p8OYQUuI/${pathFoto}`;
                /**
                 * Agregamos la libreria downloads con npm install downloads para hacer la descarga de la imagen de telegram
                 */
              const filePath=`${__dirname}/downloads`;
              download(urlPath,filePath)
                .then(()=>{
                    console.log("Descarga Completa");
                })
    
            
            })
        }).on('error', err => {
            console.log(err.message);
        })
        
        
    }
  

});
    
}

module.exports={botTelegram};