const {response}=require('express');


const usuariosGet=(req, res)=>{
    res.json({
        ok:true,
        msg:'Get usuarios'
    });
}

const usuariosPost = (req, res=response)=>{
    const body=req.body;


    res.json({
        ok:true,
        body
    })
}

const usuariosPut=(req, res=response)=>{
    const id = req.params.id;

    res.json({
        ok:true,
        id
    })
}

const usuariosDelete=(req,res=response)=>{

    const id = req.params.id;

    res.json({
        ok:true,
        msg:'Eliminar usuario'
    })
}

module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosDelete
}