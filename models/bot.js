process.env.NTBA_FIX_319 = 1;
const TelegramBot = require('node-telegram-bot-api');
const fs = require('fs');
const https = require('https');
const download = require('download');
const {sequelize} = require('sequelize');
const { Op } = require('sequelize');
const Moment = require('moment');
const nodemailer =require('nodemailer');


const Asistencias = require('../models/asistencia');
const Tareas =  require('../models/tareas');
//const Extenciones =  require('../models/solicitdes');
const Finalizadas = require('../models/asignadas');
const Registros = require('../models/registros');
const Solicitud = require('../models/solicitud');
const BitacoraSolicitud = require('../models/bitacoraSolicitudes');



const botTelegram = async()=>{
    const token = 'xxxxxxxxxxx';
    const bot = new TelegramBot(token, {polling:true});

    console.log(bot);
    console.log('veremos como se cae la conexion...');
    

    bot.onText(/^\/start/, function(msg){
        var chatId = msg.chat.id;
        var nameUser = msg.from.first_name;
        var alias = msg.from.username;
        
        bot.sendMessage(chatId, "<b>Bienvenido</b> : \n<b>" + nameUser+"</b>\n <b>"+alias+"</b>\n <b>COMANDOS :</b>\n  /finalizadas \n /solicitudes ",{parse_mode : "HTML"});
    });

    bot.on('polling_error', function(error){
        console.log(error);
    });


    bot.onText(/^\/formato/, function(msg){
        console.log(msg);
        var chatId = msg.chat.id;
        var nameUser = msg.from.first_name;
        var alias = msg.from.username;
        
        bot.sendMessage(chatId, `
        <b>Formato para envio de datos vales de combustible</b> :\n \n<b>Bienvenido : ${nameUser}</b>\n\n
        <b>EJEMPLO FORMATO CORRECTO : </b>\n \n<b>Fecha, Hora, Piloto, Codigo, Acompañante, No. Comporbante, Placas, Nombre Gasolinera, Cantidad Abastecida, Cantidad de Cupones, Numero Cupones Q.50, Numero Cupones Q.100, Kilometraje, Precio por Galon, Total de Galones Abastecidos</b> `
        ,{parse_mode : "HTML"});

        setTimeout(()=>{
            bot.sendMessage(chatId, `
            <b>EJEMPLO ENVIO DE DATOS : </b>\n \n<b>2022-07-06, 16:20, Pablo Amilcar Yanez Castro, 200, Opcional, Fac-02154B, P-123DKG, PUMA Avenida las americas, 500, 6, 12345678 1234679, 987654320 987654321 987654322 987654323, 123456, 47.65, 12.56</b>\n \n Se devera adjuntar la foto del comprobante y en la descripción de la foto se agregaran los datos solicitados, realizarlo con forme al orden establecido de lo contrario sera un registro invalido. `
            ,{parse_mode : "HTML"});
        },1000);
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
            nombreTecnico ='Francisco Ericastilla';
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
            nombreTecnico ='Francisco Ericastilla';
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
            nombreTecnico ='Francisco Ericastilla';
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
 * Metodo para ver los registros del codigo
 * 
 * modificar para que sino hay codigo me traiga por un rago de fechas
 */

bot.on('message', async(msg) => {
    var chatId=msg.chat.id;
    var myId = msg.from.id;
    var fecha = msg.date;
    var codigo = msg.text;

    var f = Moment.unix(fecha).format('YYYY-MM-DD');//fecha actual cuando se solicita

    if(codigo===undefined){
        //bot.sendMessage(chatId,'Por favor ejecute el comando /start para ver opciones',{parse_mode : "HTML"});
    }else{
        const arreglo = codigo.split(',');
        let busqueda = arreglo[0];
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
                    let accion = item.accion;
                    let idSede= item.sedeIngreso;
                    let accion1='';
                    if(accion==1){
                        accion1='Ingreso';
                    }
                    if(accion==2){
                        accion1='Salida';
                    }

                    let nombresede='';
                    if(idSede==1){
                        nombresede='Zona 4';
                    }else if(idSede==2){
                        nombresede='Zona 9';
                    }else if(idSede==3){
                        nombresede='Norte';
                    }else if(idSede==4){
                        nombresede='Sur';
                    }else if(idSede==5){
                        nombresede='Oriente';
                    }else if(idSede==6){
                        nombresede='Occidente';
                    }else if(idSede==10){
                        nombresede='Zona 1';
                    }else if(idSede==11){
                        nombresede='Zona 6';
                    }else if(idSede==12){
                        nombresede='Zona 10';
                    }


                    
                    var fe = Moment.utc(fechaIngreso).format("YYYY-MM-DD hh:mma");
                    
                    var f=`<i>${fe} ${accion1}   ${nombresede}</i>\n`;
                    reg.push(f);
                   
                });
                bot.sendMessage(chatId,reg.toString(),{parse_mode : "HTML"});
            }else{
                //bot.sendMessage(chatId,'Por favor ingresar el formato : <b>211,2022-04-20,2022-04-23</b>',{parse_mode : "HTML"});
            }
        }else{
            //bot.sendMessage(chatId,'Por favor ingresar el formato : <b>211,2022-04-20,2022-04-23</b>',{parse_mode : "HTML"});
        }  
    }
   
  
  
       
});



/**
 * METODO  PARA LAS SOLICITUDES DESDE EL INICIO
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
 * CON ESTE METODO CAPTURAMOS LA ASISTENCIA DE LOS PARTICIPANTES DONDE TRAEREMOS EL ID DE TELEGRAM,
 * NOMBRE DE USUARIO, ALIAS Y FECHA CUANDO DA CLICK EN EL BOTON QUE SE LE MUESTRA EN EL CHAT
 */

///para informatica
bot.onText(/^\/asuntos/,async(msg)=>{
    var chatId=msg.chat.id;
   
    var f='';
    const reg = [];
    if(msg.text==='/asuntos'){
        const total=await Solicitud.findAll(
            {where:
                {estado:7,autorizacion:1,id_division:15}
            }
        );
        
        if(total.length==0){
            bot.sendMessage(chatId,"No hay solicitudes pendientes de autorizar..",botones);
        }else{
            total.forEach((item)=>{

                reg.push(item.id_solicitud+'\n Descripción:'+item.descripcion);
            
            });
            f=`Total solicitudes de soporte Pendientes de autorizar\nNo.${reg}`;

            var botones = {
                reply_markup:{
                    inline_keyboard:[
                        [
                            {text:"Validar Solicitud",callback_data:'boton1'},
                            {text:"Denegar solicitud",callback_data:'boton2'}
                        ]
                    ]
                }
            };

            bot.sendMessage(chatId,f,botones);
   
            bot.on('callback_query',async function onCallbackQuery(accionboton){
                const data = accionboton.data;
                console.log(accionboton.from.id);
                console.log(accionboton.from.first_name);
                
                if(data=='boton1'){
                
                
                    let myId = accionboton.from.id;
                   
                    let nombre = accionboton.from.first_name;
                    
                    let fecha = new Date();

                    let datosUser = `TelegramUser :${myId},${nombre}`;
                    reg.forEach((id)=>{
                        let idSol =id;
                        Solicitud.update(
                            {
                                autorizacion:2,
                                estado:6
                            },{
                                where:{
                                    id_solicitud:id
                                }
                            }
                        ) .then(()=>console.log('Actualizado  Correctamente!!'))
                            .catch(error=>console.log(error));


                        let action ='Autorizada';
                        BitacoraSolicitud.create({id:null,id_solicitud:idSol,usuario:datosUser,fecha_cambio:fecha,accion:action})
                                    .then(()=>console.log('Insertado Correctamente!!'))
                                    .catch(error=>console.log(error));
                        bot.answerCallbackQuery(accionboton.id, {text: 'Solicitud de soporte validada correctamente', show_alert: true});   
                    });  
                }
            })
        }

    }
    
   

  
   
});




bot.onText(/^\/informatica/,async(msg)=>{
    console.log(msg);
    var chatId=msg.chat.id;
   
    var f='';
    const reg = [];
    if(msg.text==='/informatica'){
        const total=await Solicitud.findAll(
            {where:
                {estado:7,autorizacion:1,id_division:11}
            }
        );
        
        if(total.length==0){
            bot.sendMessage(chatId,"No hay solicitudes pendientes de autorizar..",botones);
        }else{
            total.forEach((item)=>{
                let soli=`${item.id_solicitud}\nDescripción:${item.descripcion}\n`;
                reg.push(soli);
            
            });
            f=`Total solicitudes de soporte Pendientes de autorizar\n\nNo.${reg}\n\n`;

            var botones = {
                reply_markup:{
                    inline_keyboard:[
                        [
                            {text:"Validar Solicitud",callback_data:'boton1'},
                            {text:"Denegar solicitud",callback_data:'boton2'}
                        ]
                    ]
                }
            };

            bot.sendMessage(chatId,f,botones);
   
            bot.on('callback_query',async function onCallbackQuery(accionboton){
                const data = accionboton.data;
                console.log(accionboton.from.id);
                console.log(accionboton.from.first_name);
                
                if(data=='boton1'){
                
                
                    let myId = accionboton.from.id;
                   
                    let nombre = accionboton.from.first_name;
                    
                    let fecha = new Date();

                    let datosUser = `TelegramUser :${myId},${nombre}`;
                    reg.forEach((id)=>{
                        let idSol =id;
                        Solicitud.update(
                            {
                                autorizacion:2,
                                estado:6
                            },{
                                where:{
                                    id_solicitud:id
                                }
                            }
                        ) .then(()=>console.log('Actualizado  Correctamente!!'))
                            .catch(error=>console.log(error));


                        let action ='Autorizada';
                        BitacoraSolicitud.create({id:null,id_solicitud:idSol,usuario:datosUser,fecha_cambio:fecha,accion:action})
                                    .then(()=>console.log('Insertado Correctamente!!'))
                                    .catch(error=>console.log(error));
                        bot.answerCallbackQuery(accionboton.id, {text: 'Solicitud de soporte validada correctamente', show_alert: true});   
                    });  
                }
            })
        }

    }
    
   
    
  
 });


///seguridad

// bot.onText(/^\/informatica/,(msg)=>{
//     var chatId=msg.chat.id;
    

//     if(msg.text==='/informatica'){
       
//     }
    
//     var botones = {
//         reply_markup:{
//             inline_keyboard:[
//                 [
//                     {text:"Validar Soiicitud",callback_data:'boton1'},
//                     {text:"Denegar solicitud",callback_data:'boton2'}
//                 ]
//             ]
//         }
//     };

//     var f=`Total solicitudes de soporte seguridad \n\n<b>Dirección General :\n<b>SubDirección:\n<b>Inteligencia:\n`;
//     bot.sendMessage(chatId,f,botones,{parse_mode : "HTML"});
   
//     bot.on('callback_query',async function onCallbackQuery(accionboton){
//         const data = accionboton.data;
        
//         if(data=='boton1'){
        
        
//         let myId = accionboton.from.id;
//         const codigo = myId;
//         let nombre = accionboton.from.first_name;
//         let alias = accionboton.from.username;
//         let fecha = new Date();

//         await Asistencias.create({codigo,nombre,alias,fecha})
//             .then(()=>console.log('Insertado Correctamente!!'))
//             .catch(error=>console.log(error));
//             bot.answerCallbackQuery(accionboton.id, {text: 'Solicitud de soporte validada correctamente', show_alert: true});
//         }
       
//     })
// });


/**
 * HAREMOS UN METODO PARA SABER QUE USUARIOS HAN REGISTRADO SU ASISTENCIA
 */

 bot.onText(/^\/myasistencia/,async(msg)=>{

    var chatId=msg.chat.id;
    var myId = msg.from.id;
    
    const conteo =await Asistencias.findAll({
        where:{
            codigo:myId
        }
    });
        let fecha='';
      const nuevoArreglo= conteo.forEach(item => {
        if(item.fecha){
            fecha = item.fecha.toString();
        }else{
            fecha = '';
        }
        const mensaje = `<b>ID</b>: <i>${item.codigo}</i> \n <b>NOMBRE</b><i> ${item.nombre}</i> \n <b>ALIAS</b> : <i>${item.alias}</i> \n <b>FECHA </b>: <i>${item.fecha}</i> \n\n`;
           bot.sendMessage(chatId,mensaje,{parse_mode : "HTML"});
      });
    
});




/**
 * NECESITO CREAR UN METODO PARA TRAER UNA IMAGEN DESDE EL GRUPO DE TELEGRAM
 */

 bot.on('message', (msg) => {
    // console.log(msg);
    if(msg.photo){

       const codigo = msg.from.id;
       const nombre = msg.from.first_name;
       const alias = msg.from.username;
       const mensaje = msg.caption;
    
        let foto = msg.photo[1].file_id;
        const url=`https://api.telegram.org/bot5384108617:AAElxSzqHvuIZv2dfPnXUgcjWC8r5iDuzRA/getFile?file_id=${foto}`;
        https.get(url, res => {
            let data = '';
            res.on('data', chunk => {
              data += chunk;
            });
            res.on('end', () => {
              data = JSON.parse(data);
              console.log(data);
              let pathFoto = data.result.file_path;
              const urlPath = `https://api.telegram.org/file/bot5384108617:AAElxSzqHvuIZv2dfPnXUgcjWC8r5iDuzRA/${pathFoto}`;

           


                /**
                 * Agregamos la libreria downloads con npm install downloads para hacer la descarga de la imagen de telegram
                 */
                 const token = generateToken(5);
              const filePath=`${__dirname}/downloads/`;
              //const filePath=`http://192.168.0.72/digici_full/admin/seguridad/fotovales/`;



              download(urlPath,filePath)
                .then(()=>{
                    console.log("Descarga Completa");
                })
                
               

                const filePath56=`${pathFoto}`;
                const ruta = filePath56;
                const estado =1;

                console.log(mensaje);
                

                Tareas.create({codigo,nombre,alias,mensaje,ruta,estado})
                    .then(()=>console.log('Insertado Correctamente!!'))
                    .catch(error=>console.log(error));


                //ENVIAR FOTO POR CORREO ELECTRONICO

                //la url proveniente de telegram trae lo siguiente photos/file_21.jpg
                //por lo que con el metodo slice eliminamos la palabra photos/ y asi poder
                //enviar la foto como archivo adjunto por correo 
                const foto = pathFoto.slice(7)
                
                /*Haremos el tratamiento del mensaje para enviarlo atravez del correo */

//const mensaje =`2022-07-06, 16:20, Pablo Amilcar Yanez Castro, 200, N/A, Fac-02154B, P-123DKG, PUMA Avenida las americas, 500, 6, 12345678 1234679, 987654320 987654321 987654322 987654323, 123456, 47.65, 12.56`;
                //let nuevo = mensaje.replace(/ /g, "")
                //const arraymensaje = mensaje.split(',');
                // let hora = arraymensaje[1].replace(/ /g, "")

                const sender = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                      user: 'advinjosuev899@gmail.com',
                      pass: 'svouflvocspcwihk'
                    }
                });

                const arraymensaje = mensaje.split(',');
                let Fecha=arraymensaje[0];
                let Hora=arraymensaje[1];
                let Nombre=arraymensaje[2];
                let codigon=arraymensaje[3];
                let Acompañante=arraymensaje[4];
                let Comprobante=arraymensaje[5];
                let Placa=arraymensaje[6];
                let Gasoliera=arraymensaje[7];
                let cantidada=arraymensaje[8];
                let cantidadv=arraymensaje[9];
                let Vales50=arraymensaje[10];
                let Vales100=arraymensaje[11];
                let km=arraymensaje[12];
                let preciog=arraymensaje[13];
                let totalabastecido=arraymensaje[14];


                let enviarfoto =`${__dirname}/downloads/${foto}`

                const mail = {
                    from: "sistemab@sistemab.com",
                    to: "ajvasquez@digici.gob.gt",
                    subject:`Abastecimiento de Combustible ${Comprobante}`,
                    html: `
                    <!DOCTYPE html>
                    <html xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office" lang="en">
                    
                    <head>
                        <title></title>
                        <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
                        <meta name="viewport" content="width=device-width, initial-scale=1.0">
                        <!--[if mso]><xml><o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch><o:AllowPNG/></o:OfficeDocumentSettings></xml><![endif]-->
                        <!--[if !mso]><!-->
                        <link href="https://fonts.googleapis.com/css?family=Nunito" rel="stylesheet" type="text/css">
                        <link href="https://fonts.googleapis.com/css?family=Oswald" rel="stylesheet" type="text/css">
                        <link href="https://fonts.googleapis.com/css?family=Roboto+Slab" rel="stylesheet" type="text/css">
                        <!--<![endif]-->
                        <style>
                            * {
                                box-sizing: border-box;
                            }
                    
                            body {
                                margin: 0;
                                padding: 0;
                            }
                    
                            a[x-apple-data-detectors] {
                                color: inherit !important;
                                text-decoration: inherit !important;
                            }
                    
                            #MessageViewBody a {
                                color: inherit;
                                text-decoration: none;
                            }
                    
                            p {
                                line-height: inherit
                            }
                    
                            .desktop_hide,
                            .desktop_hide table {
                                mso-hide: all;
                                display: none;
                                max-height: 0px;
                                overflow: hidden;
                            }
                    
                            @media (max-width:700px) {
                                .row-content {
                                    width: 100% !important;
                                }
                    
                                .mobile_hide {
                                    display: none;
                                }
                    
                                .stack .column {
                                    width: 100%;
                                    display: block;
                                }
                    
                                .mobile_hide {
                                    min-height: 0;
                                    max-height: 0;
                                    max-width: 0;
                                    overflow: hidden;
                                    font-size: 0px;
                                }
                    
                                .desktop_hide,
                                .desktop_hide table {
                                    display: table !important;
                                    max-height: none !important;
                                }
                            }
                        </style>
                    </head>
                    
                    <body style="background-color: #FFFFFF; margin: 0; padding: 0; -webkit-text-size-adjust: none; text-size-adjust: none;">
                        <table class="nl-container" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #FFFFFF;">
                            <tbody>
                                <tr>
                                    <td>
                                        <table class="row row-1" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #ffffff;">
                                            <tbody>
                                                <tr>
                                                    <td>
                                                        <table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #ffffff; background-position: center top; color: #000000; width: 680px;" width="680">
                                                            <tbody>
                                                                <tr>
                                                                    <td class="column column-1" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; padding-top: 0px; padding-bottom: 0px; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
                                                                        <table class="text_block block-1" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
                                                                            <tr>
                                                                                <td class="pad" style="padding-bottom:5px;padding-left:20px;padding-right:10px;padding-top:55px;">
                                                                                    <div style="font-family: sans-serif">
                                                                                        <div class="txtTinyMce-wrapper" style="font-size: 12px; mso-line-height-alt: 14.399999999999999px; color: #3fb9bc; line-height: 1.2; font-family: Oswald, Arial, Helvetica Neue, Helvetica, sans-serif;">
                                                                                            <p style="margin: 0; font-size: 14px; text-align: center;"><span style="font-size:50px;color:#030050;"><strong>Control de Combustible</strong></span></p>
                                                                                        </div>
                                                                                    </div>
                                                                                </td>
                                                                            </tr>
                                                                        </table>
                                                                        <table class="text_block block-2" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
                                                                            <tr>
                                                                                <td class="pad" style="padding-bottom:30px;padding-left:15px;padding-right:15px;padding-top:15px;">
                                                                                    <div style="font-family: Arial, sans-serif">
                                                                                        <div class="txtTinyMce-wrapper" style="font-size: 12px; mso-line-height-alt: 18px; color: #555555; line-height: 1.5; font-family: 'Roboto Slab', Arial, 'Helvetica Neue', Helvetica, sans-serif;">
                                                                                            <p style="margin: 0; font-size: 12px; mso-line-height-alt: 18px;">&nbsp;</p>
                                                                                        </div>
                                                                                    </div>
                                                                                </td>
                                                                            </tr>
                                                                        </table>
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                        <table class="row row-2" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                            <tbody>
                                                <tr>
                                                    <td>
                                                        <table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #000000; width: 680px;" width="680">
                                                            <tbody>
                                                                <tr>
                                                                    <td class="column column-1" width="33.333333333333336%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
                                                                        <table class="image_block block-2" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                                                            <tr>
                                                                                <td class="pad" style="width:100%;padding-right:0px;padding-left:0px;padding-top:5px;padding-bottom:5px;">
                                                                                    <div class="alignment" align="center" style="line-height:10px"><img src="${urlPath}" style="display: block; height: auto; border: 0; width: 227px; max-width: 100%;" width="227" alt="I'm an image" title="I'm an image"></div>
                                                                                </td>
                                                                            </tr>
                                                                        </table>
                                                                    </td>
                                                                    <td class="column column-2" width="66.66666666666667%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
                                                                        <table class="text_block block-2" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
                                                                            <tr>
                                                                                <td class="pad" style="padding-top:15px;padding-right:10px;padding-bottom:10px;padding-left:10px;">
                                                                                    <div style="font-family: sans-serif">
                                                                                        <div class="txtTinyMce-wrapper" style="font-size: 12px; font-family: Oswald, Arial, Helvetica Neue, Helvetica, sans-serif; mso-line-height-alt: 14.399999999999999px; color: #555555; line-height: 1.2;">
                                                                                            <ul style="line-height: 1.2; mso-line-height-alt: 14.399999999999999px; font-size: 14px;">
                                                                                                <li style="text-align: left;"><strong>Nombre cuenta telegram :</strong>${nombre}</li>
                                                                                                <li style="text-align: left;"><span style="font-size:14px;"><strong>Código</strong></span><strong style="font-family:inherit;font-family:inherit;font-size:14px;"> telegram :</strong>  ${codigo}</li>
                                                                                                <li style="text-align: left;"><strong>Fecha abastecimiento : </strong>${Fecha}</li>
                                                                                                <li style="text-align: left;"><strong>Hora abastecimiento :&nbsp;${Hora}</strong></li>
                                                                                                <li style="text-align: left;"><strong>Nombre : </strong> ${Nombre}</li>
                                                                                                <li style="text-align: left;"><span style="font-size:14px;"><strong>Código</strong></span><strong style="font-family:inherit;font-family:inherit;font-size:14px;"> : </strong>${codigon}</li>
                                                                                                <li style="text-align: left;"><strong>Acompañante :</strong> ${Acompañante}</li>
                                                                                                <li style="text-align: left;"><strong>Comprobante :</strong> ${Comprobante}</li>
                                                                                                <li style="text-align: left;"><strong>Placa :&nbsp;</strong> ${Placa}</li>
                                                                                                <li style="text-align: left;"><strong>Gasolinera :</strong>  ${Gasoliera}</li>
                                                                                                <li style="text-align: left;"><strong>Cantidad abastecida :</strong> ${cantidada}</li>
                                                                                                <li style="text-align: left;"><strong>Cantidad vales :</strong> ${cantidadv}</li>
                                                                                                <li style="text-align: left;"><strong>Vales Q.50 :&nbsp;</strong>${Vales50}</li>
                                                                                                <li style="text-align: left;"><strong>Vales Q.100 :&nbsp;</strong>${Vales100}</li>
                                                                                                <li style="text-align: left;"><strong>Kilometraje : </strong>${km}</li>
                                                                                                <li style="text-align: left;"><strong style="font-family:inherit;font-family:inherit;font-size:14px;">Precio por </strong><span style="font-size:14px;"><strong>galón</strong></span><strong style="font-family:inherit;font-family:inherit;font-size:14px;"> :</strong>${preciog}</li>
                                                                                                <li style="text-align: left;"><strong>Cantidad Galones : </strong>${totalabastecido}</li>
                                                                                            </ul>
                                                                                        </div>
                                                                                    </div>
                                                                                </td>
                                                                            </tr>
                                                                        </table>
                                                                        <table class="divider_block block-3" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                                                            <tr>
                                                                                <td class="pad" style="padding-top:10px;padding-right:10px;padding-bottom:15px;padding-left:10px;">
                                                                                    <div class="alignment" align="center">
                                                                                        <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                                                                            <tr>
                                                                                                <td class="divider_inner" style="font-size: 1px; line-height: 1px; border-top: 1px solid #BBBBBB;"><span>&#8202;</span></td>
                                                                                            </tr>
                                                                                        </table>
                                                                                    </div>
                                                                                </td>
                                                                            </tr>
                                                                        </table>
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                        <table class="row row-3" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                            <tbody>
                                                <tr>
                                                    <td>
                                                        <table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #000000; width: 680px;" width="680">
                                                            <tbody>
                                                                <tr>
                                                                    <td class="column column-1" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; padding-top: 35px; padding-bottom: 15px; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
                                                                        <table class="button_block block-1" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                                                            <tr>
                                                                                <td class="pad" style="padding-bottom:20px;padding-left:10px;padding-right:10px;padding-top:10px;text-align:center;">
                                                                                    <div class="alignment" align="center">
                                                                                        <!--[if mso]><v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="https://192.168.0.72/digici_full/admin/seguridad/combustibleseguridad.php" style="height:64px;width:328px;v-text-anchor:middle;" arcsize="55%" stroke="false" fillcolor="#000000"><w:anchorlock/><v:textbox inset="0px,0px,0px,0px"><center style="color:#ffffff; font-family:Arial, sans-serif; font-size:22px"><![endif]-->
                                                                                        <a href="https://192.168.0.72/digici_full/admin/seguridad/combustibleseguridad.php" target="_blank" style="text-decoration:none;display:inline-block;color:#ffffff;background-color:#000000;border-radius:35px;width:auto;border-top:0px solid #2F7D81;font-weight:400;border-right:0px solid #2F7D81;border-bottom:0px solid #2F7D81;border-left:0px solid #2F7D81;padding-top:10px;padding-bottom:10px;font-family:Oswald, Arial, Helvetica Neue, Helvetica, sans-serif;text-align:center;mso-border-alt:none;word-break:keep-all;">
                                                                                            <span style="padding-left:45px;padding-right:45px;font-size:22px;display:inline-block;letter-spacing:normal;">
                                                                                            <span dir="ltr" style="word-break: break-word;">
                                                                                            <span style="line-height: 44px;" dir="ltr" data-mce-style>VERIFICAR REGISTRO</span></span></span></a>
                                                                                        <!--[if mso]></center></v:textbox></v:roundrect><![endif]-->
                                                                                    </div>
                                                                                </td>
                                                                            </tr>
                                                                        </table>
                                                                        <table class="text_block block-2" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
                                                                            <tr>
                                                                                <td class="pad">
                                                                                    <div style="font-family: sans-serif">
                                                                                        <div class="txtTinyMce-wrapper" style="font-size: 12px; mso-line-height-alt: 14.399999999999999px; color: #3fb9bc; line-height: 1.2; font-family: Oswald, Arial, Helvetica Neue, Helvetica, sans-serif;">
                                                                                            <p style="margin: 0; font-size: 14px; text-align: center;"><span style="font-size:34px;"><span style="color:#030050;"><strong style="font-size:34px;">Desarrollo, </strong><span style="font-size:34px;"><strong>Informática</strong></span></span></span></p>
                                                                                        </div>
                                                                                    </div>
                                                                                </td>
                                                                            </tr>
                                                                        </table>
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                        <table class="row row-4" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                            <tbody>
                                                <tr>
                                                    <td>
                                                        <table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #000000; width: 680px;" width="680">
                                                            <tbody>
                                                                <tr>
                                                                    <td class="column column-1" width="33.333333333333336%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
                                                                        <table class="image_block block-2" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                                                            <tr>
                                                                                <td class="pad" style="width:100%;padding-right:0px;padding-left:0px;padding-top:5px;">
                                                                                    <div class="alignment" align="center" style="line-height:10px"><img src="https://d1oco4z2z1fhwp.cloudfront.net/templates/default/1741/company.png" style="display: block; height: auto; border: 0; width: 64px; max-width: 100%;" width="64" alt="Alternate text" title="Alternate text"></div>
                                                                                </td>
                                                                            </tr>
                                                                        </table>
                                                                        <table class="text_block block-3" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
                                                                            <tr>
                                                                                <td class="pad" style="padding-bottom:10px;padding-left:10px;padding-right:10px;padding-top:20px;">
                                                                                    <div style="font-family: sans-serif">
                                                                                        <div class="txtTinyMce-wrapper" style="font-size: 12px; mso-line-height-alt: 14.399999999999999px; color: #232132; line-height: 1.2; font-family: Oswald, Arial, Helvetica Neue, Helvetica, sans-serif;">
                                                                                            <p style="margin: 0; font-size: 14px; text-align: center;"><span style="font-size:18px;"><strong>LOREM IPSUM</strong></span></p>
                                                                                        </div>
                                                                                    </div>
                                                                                </td>
                                                                            </tr>
                                                                        </table>
                                                                        <table class="text_block block-4" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
                                                                            <tr>
                                                                                <td class="pad" style="padding-bottom:15px;padding-left:10px;padding-right:10px;">
                                                                                    <div style="font-family: Arial, sans-serif">
                                                                                        <div class="txtTinyMce-wrapper" style="font-size: 12px; font-family: 'Roboto Slab', Arial, 'Helvetica Neue', Helvetica, sans-serif; mso-line-height-alt: 18px; color: #808080; line-height: 1.5;">
                                                                                            <p style="margin: 0; font-size: 14px; text-align: center; mso-line-height-alt: 21px;"><span style="font-size:14px;">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer dui magna, convallis</span></p>
                                                                                        </div>
                                                                                    </div>
                                                                                </td>
                                                                            </tr>
                                                                        </table>
                                                                    </td>
                                                                    <td class="column column-2" width="33.333333333333336%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
                                                                        <table class="image_block block-2" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                                                            <tr>
                                                                                <td class="pad" style="width:100%;padding-right:0px;padding-left:0px;padding-top:5px;">
                                                                                    <div class="alignment" align="center" style="line-height:10px"><img src="https://d1oco4z2z1fhwp.cloudfront.net/templates/default/1741/work.png" style="display: block; height: auto; border: 0; width: 64px; max-width: 100%;" width="64" alt="Alternate text" title="Alternate text"></div>
                                                                                </td>
                                                                            </tr>
                                                                        </table>
                                                                        <table class="text_block block-3" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
                                                                            <tr>
                                                                                <td class="pad" style="padding-bottom:10px;padding-left:10px;padding-right:10px;padding-top:20px;">
                                                                                    <div style="font-family: sans-serif">
                                                                                        <div class="txtTinyMce-wrapper" style="font-size: 12px; mso-line-height-alt: 14.399999999999999px; color: #232132; line-height: 1.2; font-family: Oswald, Arial, Helvetica Neue, Helvetica, sans-serif;">
                                                                                            <p style="margin: 0; font-size: 14px; text-align: center;"><span style="font-size:18px;"><strong>DOLOR SIT AMET</strong></span></p>
                                                                                        </div>
                                                                                    </div>
                                                                                </td>
                                                                            </tr>
                                                                        </table>
                                                                        <table class="text_block block-4" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
                                                                            <tr>
                                                                                <td class="pad" style="padding-bottom:15px;padding-left:10px;padding-right:10px;">
                                                                                    <div style="font-family: Arial, sans-serif">
                                                                                        <div class="txtTinyMce-wrapper" style="font-size: 12px; font-family: 'Roboto Slab', Arial, 'Helvetica Neue', Helvetica, sans-serif; mso-line-height-alt: 18px; color: #808080; line-height: 1.5;">
                                                                                            <p style="margin: 0; font-size: 14px; text-align: center; mso-line-height-alt: 21px;"><span style="font-size:14px;">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer dui magna, convallis</span></p>
                                                                                        </div>
                                                                                    </div>
                                                                                </td>
                                                                            </tr>
                                                                        </table>
                                                                    </td>
                                                                    <td class="column column-3" width="33.333333333333336%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
                                                                        <table class="image_block block-2" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                                                            <tr>
                                                                                <td class="pad" style="width:100%;padding-right:0px;padding-left:0px;padding-top:5px;">
                                                                                    <div class="alignment" align="center" style="line-height:10px"><img src="https://d1oco4z2z1fhwp.cloudfront.net/templates/default/1741/solution.png" style="display: block; height: auto; border: 0; width: 64px; max-width: 100%;" width="64" alt="Alternate text" title="Alternate text"></div>
                                                                                </td>
                                                                            </tr>
                                                                        </table>
                                                                        <table class="text_block block-3" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
                                                                            <tr>
                                                                                <td class="pad" style="padding-bottom:10px;padding-left:10px;padding-right:10px;padding-top:20px;">
                                                                                    <div style="font-family: sans-serif">
                                                                                        <div class="txtTinyMce-wrapper" style="font-size: 12px; mso-line-height-alt: 14.399999999999999px; color: #232132; line-height: 1.2; font-family: Oswald, Arial, Helvetica Neue, Helvetica, sans-serif;">
                                                                                            <p style="margin: 0; font-size: 14px; text-align: center;"><span style="font-size:18px;"><strong>INTEGER MAGNA</strong></span></p>
                                                                                        </div>
                                                                                    </div>
                                                                                </td>
                                                                            </tr>
                                                                        </table>
                                                                        <table class="text_block block-4" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
                                                                            <tr>
                                                                                <td class="pad" style="padding-bottom:15px;padding-left:10px;padding-right:10px;">
                                                                                    <div style="font-family: Arial, sans-serif">
                                                                                        <div class="txtTinyMce-wrapper" style="font-size: 12px; font-family: 'Roboto Slab', Arial, 'Helvetica Neue', Helvetica, sans-serif; mso-line-height-alt: 18px; color: #808080; line-height: 1.5;">
                                                                                            <p style="margin: 0; font-size: 14px; text-align: center; mso-line-height-alt: 21px;"><span style="font-size:14px;">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer dui magna, convallis</span></p>
                                                                                        </div>
                                                                                    </div>
                                                                                </td>
                                                                            </tr>
                                                                        </table>
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                        <table class="row row-5" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                            <tbody>
                                                <tr>
                                                    <td>
                                                        <table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #000000; width: 680px;" width="680">
                                                            <tbody>
                                                                <tr>
                                                                    <td class="column column-1" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; padding-top: 5px; padding-bottom: 5px; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
                                                                        <div class="spacer_block" style="height:25px;line-height:25px;font-size:1px;">&#8202;</div>
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                        <table class="row row-6" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                            <tbody>
                                                <tr>
                                                    <td>
                                                        <table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #000000; width: 680px;" width="680">
                                                            <tbody>
                                                                <tr>
                                                                    <td class="column column-1" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; padding-top: 0px; padding-bottom: 30px; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
                                                                        <table class="divider_block block-1" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                                                            <tr>
                                                                                <td class="pad">
                                                                                    <div class="alignment" align="center">
                                                                                        <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                                                                            <tr>
                                                                                                <td class="divider_inner" style="font-size: 1px; line-height: 1px; border-top: 1px solid #E0E0E0;"><span>&#8202;</span></td>
                                                                                            </tr>
                                                                                        </table>
                                                                                    </div>
                                                                                </td>
                                                                            </tr>
                                                                        </table>
                                                                        <table class="text_block block-2" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
                                                                            <tr>
                                                                                <td class="pad">
                                                                                    <div style="font-family: Arial, sans-serif">
                                                                                        <div class="txtTinyMce-wrapper" style="font-size: 12px; font-family: 'Roboto Slab', Arial, 'Helvetica Neue', Helvetica, sans-serif; mso-line-height-alt: 18px; color: #a6a4a2; line-height: 1.5;">
                                                                                            <p style="margin: 0; font-size: 14px; text-align: center; mso-line-height-alt: 18px;"><span style="font-size:12px;">This message was sent to <a style="text-decoration: none; color: #a6a4a2;" title="email@example.com" href="mailto:email@example.com">email@example.com</a></span></p>
                                                                                            <p style="margin: 0; font-size: 14px; text-align: center; mso-line-height-alt: 18px;"><span style="font-size:12px;">If you no longer wish to receive e-mails from us, <u><a style="text-decoration: none; color: #a6a4a2;" href="http://www.example.com/" target="_blank" rel="noopener">unsubscribe</a></u></span></p>
                                                                                        </div>
                                                                                    </div>
                                                                                </td>
                                                                            </tr>
                                                                        </table>
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </td>
                                </tr>
                            </tbody>
                        </table><!-- End -->
                    </body>
                    
                    </html>
                        `,
                        attachments: [
                            {
                                filename: `${Comprobante}_${foto}`,
                                path: __dirname + '/downloads/'+foto,
                                cid: `${Comprobante}${foto}`
                            }
                        ]
                };



                sender.sendMail(mail, function(error, info) {
                    if (error) {
                      console.log(error);
                    } else {
                      console.log("Correo enviado satisfactoriamente: "+ info.response);
                    }
                });

            
            })
        }).on('error', err => {
            console.log(err.message);
        })
        
    }   
    
  

});

function generateToken(length){
    let rand=()=>Math.random().toString(36).substr(2);
    return (rand()+rand()+rand()+rand()).substr(0,length)
}
    
}

module.exports={botTelegram};