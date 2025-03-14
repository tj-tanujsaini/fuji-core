const express = require('express');
const router = express.Router();

const { 
    handleGetAllUsers, 
    handleAddNewUser, 
    handleGetUserById, 
    handleUpdateUserById
} = require('../controllers/users');

router.get('/', handleGetAllUsers);
router.post('/', handleAddNewUser);
router.get('/:id', handleGetUserById);
router.patch('/:id', handleUpdateUserById);

module.exports = router;