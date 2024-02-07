
'use strict'

var Project = require('../models/project');
var fs = require('fs');

var controller = {

    home: function (req, res) {
        return res.status(200).send({
            message: 'Soy la home'
        });
    },

    test: function (req, res) {
        return res.status(200).send({
            message: 'Soy el metodo o accion test del controlador de project'
        });
    },

    saveProject: function (req, res) {
        var project = new Project();

        var params = req.body;
        project.name = params.name;
        project.description = params.description;
        project.category = params.category;
        project.year = params.year;
        project.langs = params.langs;
        project.image = null;

        project.save().then((projectStored) => {
            return res.status(200).send({
                project: projectStored,
                message: "Proyecto Guardado"
            });
        })
            .catch((error) => {
                if (!projectStored)
                    return res
                        .status(404)
                        .send({ message: "No se ha podido guardar el proyecto!" })

                if (error)
                    return res
                        .status(500)
                        .send({ message: 'Error al guardar' });
            })





    },

    getProject: function (req, res) {
        var projectId = req.params.id;

        if (projectId == null) {
            return res.status(404).send({ message: "El proyecto no existe" });
        }

        Project.findById(projectId)
            .then((project) => {
                if (!project) {
                    return res.status(404).send({ message: "El proyecto no existe" });
                }
                return res.status(200).send({ project });
            })

            .catch((err) => {
                return res.status(500).send({ message: "Error al devolver los datos" });
            });

    },

    getProjects: function (req, res) {
        Project.find({}).exec()
            .then((projects) => {
                if (!projects) {
                    return res.status(404).send({ message: "No hay proyectos que mostrar" });
                }
                return res.status(200).send({ projects });
            })
            .catch((err) => {
                return res.status(500).send({ message: "Error al devolver los datos" });
            });
    },

    updateProject: function (req, res) {
        var projectId = req.params.id;
        var update = req.body;

        Project.findByIdAndUpdate(projectId, update, { new: true })
            .then((projectUpdated) => {
                if (!projectUpdated) return res.status(404).send({ message: "No existe el proyecto para actualizar!" });

                return res.status(200).send({
                    project: projectUpdated,
                    message: "Proyecto Actualizado"
                })
            })

            .catch((err) => {
                return res.status(500).send({ message: "Error al actulizar!" })
            });
    },

    deleteProject: function (req, res) {
        var projectId = req.params.id;

        Project.findByIdAndDelete(projectId)
            .then((projectRemoved) => {
                if (!projectRemoved) return res.status(404).send({ message: "No existe el proyecto para eliminar!" });

                return res.status(200).send({
                    project: projectRemoved,
                    message: "Proyecto Eliminado"
                })
            })

            .catch((error) => {
                return res.status(500).send({ message: "Error al eliminar el Proyecto!" })
            });
    },

    uploadImage: function (req, res) {
        var projectId = req.params.id;
        var fileName = 'Imagen no subida';

        if (req.files) {
            var filePath = req.files.image.path;
            var fileSplit = filePath.split('\\');
            var fileName = fileSplit[1];
            var extSplit = filePath.split('\.');
            var fileExt = extSplit[1];

            if( fileExt == 'png' || fileExt == 'jpg' || fileExt == 'jpeg' || fileExt == 'gif') {
                Project.findByIdAndUpdate(projectId, {image: fileName}, {new:true})
                .then((projectUpdated) => {
                    if (!projectUpdated) return res.status(404).send({ message: "No existe el proyecto para actualizar la Imagen!" });
    
                    return res.status(200).send({
                        project: projectUpdated,
                        message: "Imagen cargada!"
                    })
                })
    
                .catch((err) => {
                    return res.status(500).send({ message: "Error al actulizar Imagen!" })
                });
            }else{
                fs.unlink(filePath, (err) => {
                    return res.status(200).send({message: "La extension no es valida!"})
                })
            }

            

        } else {
            return res.status(200).send({
                message: fileName
            })
        }
    }

}



module.exports = controller;