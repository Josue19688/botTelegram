
const {response, request}= require('express');
const fs = require('fs');


const asistencia = async(req=request, res=response)=>{

    const leerAsistencia = fs.readFileSync('./data/asistencia.json','utf-8');
    let asistencia = Array.from(JSON.parse(leerAsistencia));

    res.json({
        ok:true,
       asistencia
    });
}





module.exports={
    asistencia
}