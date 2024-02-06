'use strict'

var express = require('express');
var ProjectController = require('../controllers/project');

var router = express.Router();

var crypto = require('crypto')

var multer = require('multer');

const storage = multer.diskStorage({

    destination(req, file, cb) {

        cb(null, './uploads/albums');

    },

    filename(req, file = {}, cb) {

        const { originalname } = file;



        const fileExtension = (originalname.match(/\.+[\S]+$/) || [])[0];

        // cb(null, `${file.fieldname}__${Date.now()}${fileExtension}`);

        crypto.pseudoRandomBytes(16, function (err, raw) {

            cb(null, raw.toString('hex') + Date.now() + fileExtension);

        });

    },

});

var mulUpload = multer({ dest: './uploads/albums', storage });

router.get('/home', ProjectController.home);
router.get('/test', ProjectController.test);
router.post('/save-project', ProjectController.saveProject);
router.get('/project/:id?', ProjectController.getProject);
router.get('/projects', ProjectController.getProjects);
router.put('/project/:id', ProjectController.updateProject);
router.delete('/project/:id', ProjectController.deleteProject);
router.post('/upload-image/:id',  mulUpload.single('Image'), ProjectController.uploadImage);

module.exports = router;