const express = require('express')
const app = express();
const router = express.Router();

//controllers
const vendedorController = require('../Controllers/vendedorController');
const clienteController = require('../Controllers/clienteController');
//middlewares

//GET
router.get('/vendedor/:cdvend', vendedorController.findByCdvend);
router.get('/cliente/:cdcl', clienteController.findByCdcl);
router.get('/vendedor', vendedorController.index);
router.get('/cliente', clienteController.index);

//POST
router.post('/vendedor', vendedorController.create);
router.post('/cliente', clienteController.create);

//PUT
router.put('/vendedor', vendedorController.edit);
router.put('/cliente', clienteController.edit);

//DELETE
router.delete('/vendedor/:cdvend', vendedorController.delete);
router.delete('/cliente/:cdcl', clienteController.delete);

module.exports = router;