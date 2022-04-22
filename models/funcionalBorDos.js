


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
 * Mis extenciones de telefono de la intranet atravez del bot
 * 
 */

 bot.onText(/^\/extenciones/,async(msg)=>{

    var chatId=msg.chat.id;
    var myId = msg.from.id;
    const todas = [];
    const extencion =await Extenciones.findAll({
        attributes: [
            'division_depto',
            'ext',
            'usuario',
        ]
    });
            
        let m1 = extencion.splice(0,(extencion.length/5));
        let mensaje1=[];
        const msg1 = m1.forEach(item1=>{
            m=`<b>DIVISION/DEPTO</b>:<i>${item1.division_depto}</i>\n<b>EXT:</b><i>${item1.ext}</i>\n`;
            mensaje1.push(m);
            
        });

        setTimeout(()=>{
            bot.sendMessage(chatId,mensaje1.toString(),{parse_mode : "HTML"});
        },2000);



        
        let m2 = extencion.splice(0,extencion.length/4);
        let mensaje2=[];
        const msg2 = m2.forEach(item2=>{
            c=`<b>DIVISION/DEPTO</b>:<i>${item2.division_depto}</i>\n<b>EXT:</b><i>${item2.ext}</i>\n`;
            mensaje2.push(c);
        
        });

        setTimeout(()=>{
            bot.sendMessage(chatId,mensaje2.toString(),{parse_mode : "HTML"});
        },3000);



        let m3 = extencion.splice(0,extencion.length/3);
        let mensaje3 =[];
        const msg3 = m3.forEach(item3=>{
            c=`<b>DIVISION/DEPTO</b>:<i>${item3.division_depto}</i>\n<b>EXT:</b><i>${item3.ext}</i>\n`;
            mensaje3.push(c);
        
        });

        setTimeout(()=>{
        bot.sendMessage(chatId,mensaje3.toString(),{parse_mode : "HTML"});
        },5000);

        let m4 = extencion.splice(0,extencion.length/2);
        let mensaje4=[];
        const msg4 = m4.forEach(item4=>{
            c=`<b>DIVISION/DEPTO</b>:<i>${item4.division_depto}</i>\n<b>EXT:</b><i>${item4.ext}</i>\n`;
            mensaje4.push(c);
        
        });

        setTimeout(()=>{
        bot.sendMessage(chatId,mensaje4.toString(),{parse_mode : "HTML"});
        },7000);
        
        let m5 = extencion.splice(0,extencion.length);
        let mensaje5=[];
        m5.forEach(item5=>{
            c=`<b>DIVISION/DEPTO</b>:<i>${item5.division_depto}</i>\n<b>EXT:</b><i>${item5.ext}</i>\n`;
            mensaje5.push(c);
        
        });

        setTimeout(()=>{
        bot.sendMessage(chatId,mensaje5.toString(),{parse_mode : "HTML"});
        },9000);
            
});





/**
 * CON ESTE METODO CAPTURAMOS LA ASISTENCIA DE LOS PARTICIPANTES DONDE TRAEREMOS EL ID DE TELEGRAM,
 * NOMBRE DE USUARIO, ALIAS Y FECHA CUANDO DA CLICK EN EL BOTON QUE SE LE MUESTRA EN EL CHAT
 */


bot.onText(/^\/asistencia/,(msg)=>{
    var chatId=msg.chat.id;

    
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

   
    bot.on('callback_query',async function onCallbackQuery(accionboton){
        const data = accionboton.data;
       
        

        
        
        if(data=='boton1'){
        
        
        let myId = accionboton.from.id;
        const codigo = myId;
        let nombre = accionboton.from.first_name;
        let alias = accionboton.from.username;
        let fecha = new Date();

        await Asistencias.create({codigo,nombre,alias,fecha})
            .then(()=>console.log('Insertado Correctamente!!'))
            .catch(error=>console.log(error));

        

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