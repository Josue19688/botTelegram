const Router = require('express');


const router = Router();

router.get('/mensajes',(req, res)=>{
    res.json({
        ok:true,
        mensaje:'Todo esta bien'
    });
});


module.exports = {
    router
}