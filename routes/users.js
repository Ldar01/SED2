var express = require('express');
var router = express.Router();
var UserController= require('../controllers/AuthController')


// Create
router.post('/',UserController.create);

// Read
router.get('/',UserController.getAll);
router.get('/:id', UserController.get);

// Update
router.put('/:id',UserController.update);

// Delete
router.delete('/:id',UserController.delete);
module.exports = router; 


