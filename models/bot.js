process.env.NTBA_FIX_319 = 1;
const TelegramBot = require('node-telegram-bot-api');
const fs = require('fs');
const https = require('https');
const download = require('download');
const {sequelize} = require('sequelize');
const { Op } = require('sequelize');
const Moment = require('moment');


//const Asistencias = require('../models/asistencia');
//const Tareas =  require('../models/tareas');
//const Extenciones =  require('../models/solicitdes');
const Finalizadas = require('../models/asignadas');


const botTelegram = async()=>{
    const token = '5351040426:AAFGM1YN-SfAuQcgBMsz_tdrA-6p8OYQUuI';
    const bot = new TelegramBot(token, {polling:true});

    

    bot.onText(/^\/start/, function(msg){
        var chatId = msg.chat.id;
        var nameUser = msg.from.first_name;
        var alias = msg.from.username;
        
        bot.sendMessage(chatId, "Bienvenido a mi bot \n" + nameUser+"\n "+alias+"\n COMANDOS :\n  /asistencia \n /myasistencia ");
    });

    bot.on('polling_error', function(error){
        console.log(error);
    });

   




 
/**
 * 
 * CREAR UN METODO PARA TRAER TODAS LAS SOLICITUDES DEL DIA TERMINADAS Y CREADAS
 * 
 */

    bot.onText(/^\/finalizadas/,async(msg)=>{

        var chatId=msg.chat.id;
        var myId = msg.from.id;
        var fecha = msg.date;
      
        var f = Moment.unix(fecha).format('YYYY-MM-DD');
       

       
        const solicitudes =await Finalizadas.findAll({
            where:{
                estado:5,
                fecha_operada:{
                    [Op.between]:[f+' 00:00:00',f+' 23:59:59']
                }
            }
        });

        const mensaje=[];
        const total = solicitudes.length;
        const conteo =`<b>TOTAL SOLICITUDES FINALIZADAS :</b><i>${total}</i>\n Fecha : ${f}\n\n`;
       
        mensaje.push(conteo);
        solicitudes.forEach(item=>{
            let nombreTecnico ='';
            if(item.id_tecnico==53){
                nombreTecnico ='Josue vasquez';
            }
            if(item.id_tecnico==11){
                nombreTecnico ='German Castro';
            }



            var d = Moment(item.fecha_operada).format('YYYY-MM-DD');
       




            c=`<b>Tecnico</b>:<i>${nombreTecnico}</i>\n<b>Solicitud No:</b><i>${item.id_solicitud}</i>\n<b>Fecha Operada:</b><i>${d}</i>\n<b>Tarea Realiza:</b><i>${item.accion}</i>\n\n`;
            mensaje.push(c);
        
        });
        bot.sendMessage(chatId,mensaje.toString(),{parse_mode : "HTML"});
       
        console.log(solicitudes.length);
        
        
    });






    
}

module.exports={botTelegram};