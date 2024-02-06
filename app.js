'use strict'

var express = require('express');
var bodyParser = require('body-parser');

var app = express();

// Cargar Archivos Rutas
var project_routes = require('./routes/project');
// middlewares
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

// CORS


// RUTAS
app.use('/api', project_routes);
// Exportar 
module.exports = app;
