'use strict'

var mongoose = require('mongoose');
var app = require('./app');
var port = 3700;

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://127.0.0.1:27017/portafolio')
        .then(() => {
            console.log("Conexion a la base de datos establecida con exito!");

            //  Creacion de Servidor

            app.listen(port, () => {
                console.log("Servidor corriendo corectamente en la url: 0.0.0.0:3700")
            });
        })
        .catch(err => console.log(err));