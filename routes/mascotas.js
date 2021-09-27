var router = require('express').Router();
var {
  crearMascota,
  obtenerMascotas,
  modificarMascota,
  eliminarMascota,
  count
} = require('../controllers/mascotas')

router.get('/', obtenerMascotas)
router.get('/count/:cat', count)
router.get('/id:', obtenerMascotas);
router.post('/', crearMascota);
router.put('/', modificarMascota);
router.delete('/', eliminarMascota);

module.exports = router;

localhost:4001//v1/mascotas/count/Gato
localhost:4001//v1/mascotas/id=12344123531