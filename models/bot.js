process.env.NTBA_FIX_319 = 1;
const TelegramBot = require('node-telegram-bot-api');
const fs = require('fs');
const https = require('https');
const download = require('download');

const Asistencias = require('../models/asistencia');
const Tareas =  require('../models/tareas');


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

    // const leerAsistencia = fs.readFileSync('./data/asistencia.json','utf-8');
    // let asistencia = Array.from(JSON.parse(leerAsistencia));

    
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
       
        

        let fecha = new Date();
        
        if(data=='boton1'){
        
        
        let myId = accionboton.from.id;
        const codigo = myId;
        let nombre = accionboton.from.first_name;
        let alias = accionboton.from.username;
        let nuevo ={
             myId,
             nombre,
             alias,
             fecha
        };

        Asistencias.create({codigo,nombre,alias,fecha})
            .then(()=>console.log('Insertado Correctamente!!'))
            .catch(error=>console.log(error));

        // asistencia.push(nuevo);
        // const json_asistencia = JSON.stringify(asistencia);
        // fs.writeFileSync('./data/asistencia.json',json_asistencia,'utf-8');


            bot.answerCallbackQuery(accionboton.id, {text: 'Asistencia agregada correctamente', show_alert: true});
        }
       
    })
})



/**
 * HAREMOS UN METODO PARA SABER QUE USUARIOS HAN REGISTRADO SU ASISTENCIA
 */

 bot.onText(/^\/myasistencia/,async(msg)=>{

    var chatId=msg.chat.id;
    var myId = msg.from.id;

    
    const conteo =await Asistencias.findAll({
        where:{
            codigo:2027940527
        }
    });

   
    console.log(conteo);

    
    // const nuevoArreglo = asistencia.map(function(item){
    //     const id = msg.from.id;
      
    //     if(item.myId===id){
    //         const fecha = item.nuevaFecha.toString();
    //         return `<b>ID</b>: <i>${item.myId}</i> \n <b>NOMBRE</b><i> ${item.nombre}</i> \n <b>ALIAS</b> : <i>${item.alias}</i> \n <b>FECHA </b>: <i>${fecha}</i> \n\n`;
    //     }
        
    // })
    // bot.sendMessage(chatId,nuevoArreglo.toString(),{parse_mode : "HTML"});

});


// bot.onText(/^\hola/,function(msg){
//     console.log(msg);
// })


/**
 * NECESITO CREAR UN METODO PARA TRAER UNA IMAGEN DESDE EL GRUPO DE TELEGRAM
 */

 bot.on('message', (msg) => {
    //console.log(msg);
    if(msg.photo){

       const codigo = msg.from.id;
       const nombre = msg.from.first_name;
       const alias = msg.from.username;
       const mensaje = msg.caption;
    
        let foto = msg.photo[1].file_id;
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
                

                const filePath56=`${pathFoto}`;
                const ruta = filePath56;
               

                Tareas.create({codigo,nombre,alias,mensaje,ruta})
                    .then(()=>console.log('Insertado Correctamente!!'))
                    .catch(error=>console.log(error));

            
            })
        }).on('error', err => {
            console.log(err.message);
        })
        
    }   
    
  

});
    
}

module.exports={botTelegram};