const express = require('express');
const {
    handleAddExpense,
    handleGetUserExpenses 
} = require('../controllers/expenses');
const {authenticatUser} = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/', authenticatUser, handleAddExpense);
router.post('/user-expenses', authenticatUser, handleGetUserExpenses);

module.exports = router;
