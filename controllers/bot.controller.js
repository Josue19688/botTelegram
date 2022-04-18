


const asistencia = async(req, res)=>{

    // const leerAsistencia = fs.readFileSync('./data/asistencia.json','utf-8');
    // let asistencia = Array.from(JSON.parse(leerAsistencia));

    res.render('home',{
        nombrePagina:'Bot Telegram',
        tagline:'Registro de Asistencia',
        barra:true,
        boton:true
    });
}





module.exports={
    asistencia
}