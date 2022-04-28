var mongojs = require('mongojs');
var uri     = 'mongodb://127.0.0.1:27017/lab02';
var db      = mongojs(uri, ['Areas']);

function areas_listado(req, res) {
    db.Areas.find().sort({Nombre:1}, function(err, records) {
        if (err) {
            console.log('Error al acceder a la base de datos.');
            return;
        }
        res.render('m_areas_listado', {records: records});
    });
}

module.exports = {

    listado: function(req, res) {
        areas_listado(req, res);
    },

    nuevo: function(req, res) {
        res.render('m_areas_nuevo', {});
    },

    grabar_nuevo: function(req, res) {
        var xnom = req.body['xnom'];
        var xabv = req.body['xabv'];
        var xest = req.body['xest'];
        db.Areas.find().sort({_id:-1}, function(err, records) {
            if (err) {
                console.log('Error al acceder a la base de datos.');
                res.end();
                return;
            }
            var xid = records[0]._id + 1;
            db.Areas.insert({_id: xid, Nombre: xnom, Abreviatura: xabv, Estado: xest}, function(){
                areas_listado(req, res);
            });
        });
    },

    editar: function(req, res) {
        var xid=req.params.xid*1;
        console.log(xid);
        db.Areas.find({_id: xid}, function(err, records) {
            if (err) {
                console.log('Error al acceder a la base de datos.');
                res.end();
                return;
            }
            res.render('m_areas_editar', {area: records[0]});
        });
    },

    grabar_editar: function(req, res) {
        var xid = req.body['xid']*1;
        var xnom = req.body['xnom'];
        var xabv = req.body['xabv'];
        var xest = req.body['xest'];
        db.Areas.update({_id: xid}, {$set: {Nombre: xnom, Abreviatura: xabv, Estado: xest}}, function() {
            areas_listado(req, res);
        });
    },

    eliminar: function(req, res) {
        var xid=req.params.xid*1;
        console.log(xid);
        db.Areas.remove({_id: xid}, function() {
            areas_listado(req, res);
        });
    }
}