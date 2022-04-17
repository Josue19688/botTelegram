const {Router} = require('express');
const { asistencia } = require('../controllers/bot.controller');


const router = Router();

router.get('/',asistencia);


module.exports = router;