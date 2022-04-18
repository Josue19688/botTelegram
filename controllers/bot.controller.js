
const {request, response} = require('express');
const fs = require('fs');
const asistencia = async(req, res=response)=>{

    const leerAsistencia = fs.readFileSync('./data/asistencia.json','utf-8');
    let asistencia = Array.from(JSON.parse(leerAsistencia));
    
    res.json({
        ok:true,
        asistencia
    })
}





module.exports={
    asistencia
}