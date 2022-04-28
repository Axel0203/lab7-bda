var express = require('express');
var router = express.Router();

router.get('/', c_inicio);
router.get('/view engine', c_about);

function c_inicio(req, res) {
    var monedas = [ {nombre: 'Sol', pais: 'Perú'},
                    {nombre: 'Dolar', pais: 'Estados Unidos'},
                    {nombre: 'Euro', pais: 'España'} ];
    
    res.render('inicio', {titulo: 'Pagina de inicio',
                          nombre: 'Juan Perez',
                          grado: 'Primero de secundaria',
                          monedas: monedas});  
}

function c_about(req, res) {
    res.send('Acerca de ...');
}

module.exports = router;