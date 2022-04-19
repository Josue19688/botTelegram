
const {request, response} = require('express');
const Asistencias = require('../models/asistencia');
const Tareas = require('../models/tareas');
const sequelize = require('sequelize');
const res = require('express/lib/response');

const asistencia = async(req, res=response)=>{

    // let dat = new Date();
    // guardar este metodo para dar formato en el cliente angular
    // const formatDate = (date)=>{
    //     let formatted_date =  date.getFullYear() + "-" + (date.getMonth() + 1) + "-" +date.getDate()
    //     return formatted_date;
    // }

    // const nueva = formatDate(dat);

    const asistencia = await Asistencias.findAll({
        attributes: [
            'id',
            'codigo',
            'nombre',
            [sequelize.fn('date_format', sequelize.col('fecha'), '%Y-%m-%d'), 'fecha']
        ]
    })

        
    res.json({
        asistencia
    })
  
}

const asistenciaById =async(req,res=response)=>{


    const asistencia = await Asistencias.findOne({
        where:{
            id:req.params.id
        }
    });

    res.json({
        asistencia
    })
}

const tareasGet = async(req,res=response)=>{
    
    const tarea = await Tareas.findAll();

    res.json({
        ok:true,
        tarea
    });

}


const tareasById=async(req, res=response)=>{
    

    const tarea = await Tareas.findOne({
        where:{
            id:req.params.id
        }
    })

    res.json({
        ok:true,
        tarea
    })
}




module.exports={
    asistencia,
    asistenciaById,
    tareasGet,
    tareasById
}