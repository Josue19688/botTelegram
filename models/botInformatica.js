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
const Registros = require('../models/registros');
const Solicitud = require('../models/solicitud');

const botTelegramInformatica = async()=>{
    const token = '5351040426:AAFGM1YN-SfAuQcgBMsz_tdrA-6p8OYQUuI';
    const bot = new TelegramBot(token, {polling:true});

    

    bot.onText(/^\/start/, function(msg){
        var chatId = msg.chat.id;
        var nameUser = msg.from.first_name;
        var alias = msg.from.username;
        
        bot.sendMessage(chatId, "<b>Bienvenido</b> : \n<b>" + nameUser+"</b>\n <b>"+alias+"</b>\n <b>COMANDOS :</b>\n  /finalizadas \n /solicitudes ",{parse_mode : "HTML"});
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

        //const mensaje=[];
        const total = solicitudes.length;
        const conteo =`<b>TOTAL SOLICITUDES FINALIZADAS :</b><i>${total}</i>\n Fecha : ${f}\n\n`;
       
      

       
        const m1 = solicitudes.splice(0,(solicitudes.length/3));
        console.log(m1.length);
        let mensaje1=[];
        mensaje1.push(conteo);
        m1.forEach(item=>{
            let nombreTecnico ='';
            if(item.id_tecnico==53){
                nombreTecnico ='Josue vasquez';
            }
            if(item.id_tecnico==11){
                nombreTecnico ='German Castro';
            }
            if(item.id_tecnico==80){
                nombreTecnico ='David Santos';
            }
            if(item.id_tecnico==6){
                nombreTecnico ='Jose Osoy';
            }
            if(item.id_tecnico==15){
                nombreTecnico ='Fransisco Eriscastillo';
            }
            if(item.id_tecnico==16){
                nombreTecnico ='Nelson Bamaca';
            }
            if(item.id_tecnico==20){
                nombreTecnico ='Eduardo Bolaños';
            }
            if(item.id_tecnico==9){
                nombreTecnico ='Monica Reyes';
            }
            if(item.id_tecnico==161){
                nombreTecnico ='Velvet Arana';
            }
            if(item.id_tecnico==10){
                nombreTecnico ='Byron Cu';
            }

            var d = Moment(item.fecha_operada).format('YYYY-MM-DD');
       
            c=`<b>Tecnico</b>:<i>${nombreTecnico}</i>\n<b>Solicitud No:</b><i>${item.id_solicitud}</i>\n<b>Fecha Operada:</b><i>${d}</i>\n<b>Tarea Realizada:</b><i>${item.accion}</i>\n\n`;
            mensaje1.push(c);
            
        });

        setTimeout(()=>{
           bot.sendMessage(chatId,mensaje1.toString(),{parse_mode : "HTML"});
        },2000);

        const m2 = solicitudes.splice(0,(solicitudes.length/2));
        console.log(m2.length);
        let mensaje2=[];
      
        m2.forEach(item2=>{
            let nombreTecnico ='';
            if(item2.id_tecnico==53){
                nombreTecnico ='Josue vasquez';
            }
            if(item2.id_tecnico==11){
                nombreTecnico ='German Castro';
            }
            if(item2.id_tecnico==80){
                nombreTecnico ='David Santos';
            }
            if(item2.id_tecnico==6){
                nombreTecnico ='Jose Osoy';
            }
            if(item2.id_tecnico==15){
                nombreTecnico ='Fransisco Eriscastillo';
            }
            if(item2.id_tecnico==16){
                nombreTecnico ='Nelson Bamaca';
            }
            if(item2.id_tecnico==20){
                nombreTecnico ='Eduardo Bolaños';
            }
            if(item2.id_tecnico==9){
                nombreTecnico ='Monica Reyes';
            }
            if(item2.id_tecnico==161){
                nombreTecnico ='Velvet Arana';
            }
            if(item2.id_tecnico==10){
                nombreTecnico ='Byron Cu';
            }
            var d = Moment(item2.fecha_operada).format('YYYY-MM-DD');
       
            f=`<b>Tecnico</b>:<i>${nombreTecnico}</i>\n<b>Solicitud No:</b><i>${item2.id_solicitud}</i>\n<b>Fecha Operada:</b><i>${d}</i>\n<b>Tarea Realizada:</b><i>${item2.accion}</i>\n\n`;
            mensaje2.push(f);
            
        });

        setTimeout(()=>{
            bot.sendMessage(chatId,mensaje2.toString(),{parse_mode : "HTML"});
        },4000);


        const m3 = solicitudes.splice(0,(solicitudes.length));
        console.log(m3.length);
        let mensaje3=[];
        
        m3.forEach(item3=>{
            let nombreTecnico ='';
            if(item3.id_tecnico==53){
                nombreTecnico ='Josue vasquez';
            }
            if(item3.id_tecnico==11){
                nombreTecnico ='German Castro';
            }
            if(item3.id_tecnico==80){
                nombreTecnico ='David Santos';
            }
            if(item3.id_tecnico==6){
                nombreTecnico ='Jose Osoy';
            }
            if(item3.id_tecnico==15){
                nombreTecnico ='Fransisco Ericastillo';
            }
            if(item3.id_tecnico==16){
                nombreTecnico ='Nelson Bamaca';
            }
            if(item3.id_tecnico==20){
                nombreTecnico ='Eduardo Bolaños';
            }
            if(item3.id_tecnico==9){
                nombreTecnico ='Monica Reyes';
            }
            if(item3.id_tecnico==161){
                nombreTecnico ='Velvet Arana';
            }
            if(item3.id_tecnico==10){
                nombreTecnico ='Byron Cu';
            }
            var d = Moment(item3.fecha_operada).format('YYYY-MM-DD');
       
            x=`<b>Tecnico</b>:<i>${nombreTecnico}</i>\n<b>Solicitud No:</b><i>${item3.id_solicitud}</i>\n<b>Fecha Operada:</b><i>${d}</i>\n<b>Tarea Realizada:</b><i>${item3.accion}</i>\n\n`;
            mensaje3.push(x);
            
        });

        setTimeout(()=>{
            bot.sendMessage(chatId,mensaje3.toString(),{parse_mode : "HTML"});
        },6000);

     
        
        
    });


/**
 * TODO SOBRE SOLICITUDES DE SOPORTE
 */

 bot.onText(/^\/solicitudes/, async(m) => {
    const chatId=m.chat.id;
     

    const total=await Solicitud.findAll();

    const sol =await Solicitud.findAll({where:{id_division:1}});
    const sol1 =await Solicitud.findAll({where:{id_division:2}});
    const sol2 =await Solicitud.findAll({where:{id_division:3}});
    const sol3 =await Solicitud.findAll({where:{id_division:4}});
    const sol4 =await Solicitud.findAll({where:{id_division:5}});
    const sol5 =await Solicitud.findAll({where:{id_division:6}});
    const sol6 =await Solicitud.findAll({where:{id_division:7}});
    const sol7 =await Solicitud.findAll({where:{id_division:8}});
    const sol8 =await Solicitud.findAll({where:{id_division:9}});
    const sol9 =await Solicitud.findAll({where:{id_division:10}});
    const sol10 =await Solicitud.findAll({where:{id_division:11}});
    const sol11 =await Solicitud.findAll({where:{id_division:12}});
    const sol12 =await Solicitud.findAll({where:{id_division:13}});
    const sol13 =await Solicitud.findAll({where:{id_division:14}});
    const sol14 =await Solicitud.findAll({where:{id_division:15}});

    const sede1=await Solicitud.findAll({where:{sede:1}});
    const sede2=await Solicitud.findAll({where:{sede:2}});
    const sede3=await Solicitud.findAll({where:{sede:3}});
    const sede4=await Solicitud.findAll({where:{sede:4}});
    const sede5=await Solicitud.findAll({where:{sede:5}});
    const sede6=await Solicitud.findAll({where:{sede:6}});
    const sede7=await Solicitud.findAll({where:{sede:7}});
    const sede8=await Solicitud.findAll({where:{sede:8}});
    const sede9=await Solicitud.findAll({where:{sede:9}});
    const sede10=await Solicitud.findAll({where:{sede:10}});
    const sede11=await Solicitud.findAll({where:{sede:11}});
    const sede12=await Solicitud.findAll({where:{sede:12}});
    

    var f=`<b>Total solicitudes de soporte :</b><i>  ${total.length}</i>\n\n<b>Dirección General :</b><i>  ${sol.length}</i>\n<b>SubDirección:</b><i>  ${sol1.length}</i>\n<b>Inteligencia:</b><i>  ${sol2.length}</i>\n<b>CI:</b><i>  ${sol3.length}</i>\n<b>Planes:</b><i>  ${sol4.length}</i>\n<b>Secretaria General:</b><i>  ${sol5.length}</i>\n<b>Financiero:</b><i>  ${sol6.length}</i>\n<b>Logistica:</b><i>  ${sol7.length}</i>\n<b>Administracón de Personal:</b><i>  ${sol8.length}</i>\n<b>Seguridad:</b><i>  ${sol9.length}</i>\n<b>Informatica:</b><i>  ${sol10.length}</i>\n<b>Asesoria Legal:</b><i>  ${sol11.length}</i>\n<b>Auditoria Interna:</b><i>  ${sol12.length}</i>\n<b>Control de Eficiencia:</b><i>  ${sol13.length}</i>\n<b>Asuntos Internos:</b><i>  ${sol14.length}</i>\n\n<b>Solicitudes por sede:</b><i></i>\n\n<b>ZONA 4:</b><i>  ${sede1.length}</i>\n<b>ZONA 9:</b><i>  ${sede2.length}</i>\n<b>NORTE:</b><i>  ${sede3.length}</i>\n<b>SUR:</b><i>  ${sede4.length}</i>\n<b>ORIENTE:</b><i>  ${sede5.length}</i>\n<b>OCCIDENTE:</b><i>  ${sede6.length}</i>\n<b>CENTRAL:</b><i>  ${sede7.length}</i>\n<b>GEA:</b><i>  ${sede8.length}</i>\n<b>CI:</b><i>  ${sede9.length}</i>\n<b>ZONA 1:</b><i>  ${sede10.length}</i>\n<b>ZONA1:</b><i>  ${sede11.length}</i>\n<b>ZONA 10:</b><i>  ${sede12.length}</i>`;
    bot.sendMessage(chatId,f,{parse_mode : "HTML"});

    

});






/**
 * Metodo para ver los registros del codigo
 */

 bot.on('message', async(msg) => {
    var chatId=msg.chat.id;
    var myId = msg.from.id;
    var fecha = msg.date;
    var codigo = msg.text;

    var f = Moment.unix(fecha).format('YYYY-MM-DD');

    if(codigo===undefined){
        bot.sendMessage(chatId,'Por favor ejecute el comando /start para ver opciones',{parse_mode : "HTML"});
    }else{
        const arreglo = codigo.split(',');
        const busqueda = arreglo[0];
        const fechaInicial=arreglo[1];
        let fechaFinal = arreglo[2];

        if(fechaFinal==undefined){
            fechaFinal=fechaInicial;
        }

        if(/^[0-9]+\.{0,1}[0-9]+$/.test(busqueda)){
            if(fechaInicial!=undefined||fechaFinal!=undefined){
                const registros =await Registros.findAll({
                    where:{
                        numero_gafete:busqueda,
                        fechaIngreso:{
                            [Op.between]:[fechaInicial+' 00:00:00',fechaFinal+' 23:59:59']
                        }
                    }
                });
                const reg = [];
               let cod='';
                if(registros!=0){
                    cod =`<b>Gafete</b>:<i>${arreglo[0]}</i>\n`;
                   
                }else{
                    cod =`<b>Gafete</b>:<i>${arreglo[0]}</i>\n<b>Sin registros de ingreso</b>`;
                   
                }
                reg.push(cod);
                registros.forEach((item)=>{
        
                
                    var fechaIngreso = item.fechaIngreso;
                    
                    var f = Moment.utc(fechaIngreso).format("YYYY-MM-DD hh:mma");
                    
                    var f=`<b>Fecha:</b><i>${f}</i>\n`;
                    reg.push(f);
                   
                });
                bot.sendMessage(chatId,reg.toString(),{parse_mode : "HTML"});
            }else{
                bot.sendMessage(chatId,'Por favor ingresar el formato : <b>211,2022-04-20,2022-04-23</b>',{parse_mode : "HTML"});
            }
        }else{
            bot.sendMessage(chatId,'Por favor ingresar el formato : <b>211,2022-04-20,2022-04-23</b>',{parse_mode : "HTML"});
        }  
    }
   
  
  
       
});


    
}

module.exports={botTelegramInformatica};