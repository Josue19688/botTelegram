const {Router} = require('express');
const { asistencia,asistenciaById, tareasGet, tareasById } = require('../controllers/bot.controller');


const router = Router();

router.get('/',asistencia);
router.get('/:id',asistenciaById)
// router.get('/tareas',tareasGet);
// router.get('/tareas/:id',tareasById);

module.exports = router;