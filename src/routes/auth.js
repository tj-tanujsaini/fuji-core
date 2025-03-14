const express = require('express');
const router = express.Router();

const {handleUserLogin} = require('../controllers/auth');

router.post('/', handleUserLogin);

module.exports = router;