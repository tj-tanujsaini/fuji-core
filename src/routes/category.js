const express = require('express');
const router = express.Router();
const {handleGetAllCategories, handleAddCategory} = require('../controllers/categories');

router.get('/', handleGetAllCategories);
router.post('/', handleAddCategory);

module.exports = router;
