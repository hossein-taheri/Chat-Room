const express = require("express");
const router = express.Router();
const AuthController = require('../controllers/api/AuthController')
const AuthValidator = require('../middlewares/api/validators/AuthValidator')


router.post('/register', [AuthValidator.register], AuthController.register);

router.post('/login', [AuthValidator.login], AuthController.login);




module.exports = router;