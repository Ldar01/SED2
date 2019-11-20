
var mongoose = require("mongoose");
var passport = require("passport");
var User = require("../models/User");
var Photo = mongoose.model('Photos');
var upload = require('../routes/upload');
var AuthController = {};

// Restrict access to root page
AuthController.home = function (req, res) {
    Photo.find({}, ['path', 'caption'], { sort: { _id: -1 } }, function (err, photos) {
        res.render('index', { user: req.user, msg: req.query.msg, photolist: photos });
    });
    /*var id_img
    var photos= [];
    if(req.user){
        console.log('yey');
        req.user.files.forEach(function(element) {
            Photo.findOne({_id: element._id}, ['path', 'caption'], function (err, photo) {
                photos.push(photo);
                console.log('yey');
            });
        });
    };*/

};

// Go to registration page
AuthController.register = function (req, res) {
    res.render('register');
};

// Post registration
AuthController.doRegister = function (req, res) {
    User.register(new User({ email: req.body.email, username: req.body.username }), req.body.password, function (err, user) {
        if (err) {
            console.log(err);
            return res.render('register', { user: user });

        }
        passport.authenticate('local')(req, res, function () {
            console.log('iniciada sesion...supuestamente');
            res.redirect('/');
        });
    });
};

// Go to login page
AuthController.login = function (req, res) {
    res.render('login');
};

// Post login
AuthController.doLogin = function (req, res) {
    passport.authenticate('local')(req, res, function () {
        res.redirect('/');
    });
};

// logout
AuthController.logout = function (req, res) {
    req.logout();
    res.redirect('/');
};


//go to upload page
AuthController.upLoad = function (req, res) {
    res.render('upload', { user: req.user });
}

//go to superadmin
AuthController.adminSuper = function (req, res) {
    res.render('super', { user: req.user })
}

//do
AuthController.create = function (req, res) {
    // Codigo de obtener datos de la peticion
    let data = {
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    };
    // Validar valores
    if (data.username && data.email && data.password != '' && data.username != '') {
        // Crear un objeto post
        let nuevoPost = new User(data);
        // Guardar en la base datos
        nuevoPost.save(function (err, guardado) {
            if (err) {
                res.status(500);
                res.json({ code: 500, err });
            } else {
                res.json({ ok: true, message: 'Se a guardado con exito', guardado });
            }
        });

    } else {
        res.status(400);
        res.json({ err: { code: 400, message: 'Faltan datos', data } });
    }

};

AuthController.getAll = function (req, res) {
    // Obtener todos los post de la base datos
    User.find({}, function (err, posts) {
        if (err) {
            res.status(500);
            res.json({ code: 500, err });
        } else {
            res.json({ ok: true, posts });
        }
    });
    // Enviarlos como respuesta en JSON
};

AuthController.get = function (req, res) {
    // Buscar por id, el psot
    User.findOne({ _id: req.params.id }, function (err, post) {
        if (err) {
            res.status(500);
            res.json({ code: 500, err });
        } else {
            res.json({ ok: true, post });
        }
    });
    // si se encontro darlo como JSON
    // sino err
}

AuthController.update = function (req, res) {
    //Obtener los datos actulizar
    let update = {
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    };
    // Validar los datos

    // Ejecutar una actualizacion en la base datos
    User.findByIdAndUpdate(req.params.id, update, function (err, old) {
        if (err) {
            res.status(500);
            res.json({ code: 500, err });
        } else {
            res.json({ ok: true, old, update });
        }
    });


    // Respoden si tuvo exito
    // o no 
};

AuthController.delete = function (req, res) {
    // intentar eliminar
    User.findByIdAndRemove(req.params.id, function (err, eleminado) {
        if (err) {
            res.status(500);
            res.json({ code: 500, err });
        } else {
            res.json({ ok: true, eleminado });
        }
    });
    // noitifcar resultado 
};

AuthController.uploadFile = function (req, res) {
    upload(req, res, (error) => {
        if (error) {
            res.redirect('/upload');
        } else {
            if (req.file == undefined) {

                res.redirect('/upload');

            } else {

                /**
                 * Create new record in mongoDB
                 */
                var fullPath = "files/" + req.file.filename;

                var document = {
                    path: fullPath,
                    caption: req.body.caption
                };

                var photo = new Photo(document);
                photo.save(function (error) {
                    if (error) {
                        throw error;
                    }
                    req.user.files.push(photo._id);
                    req.user.save();
                    console.log('files del user'+req.user.files);
                    res.redirect('/upload');
                });
            }
        }
    });
}
module.exports = AuthController;