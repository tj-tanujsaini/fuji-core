const {Expense, Category} = require('../models');
const { Op } = require("sequelize");

async function handleAddExpense(req, res){
    const { category_id, amount, date: expenseDateTimeStamp, description } = req.body;
    const user_id = req.user.userId;
    
    if (!user_id || !category_id || !amount || !expenseDateTimeStamp) {
        return res.status(400).json({ error: "All Fields are required" });
    }

    if(typeof expenseDateTimeStamp !== 'number'){
        return res.status(400).json({ error: "Date required in epoch timestamp in milliseconds." });
    }

    try {
        const expense = await Expense.create({ user_id, category_id, amount, expense_date: expenseDateTimeStamp, description });
        res.status(201).json({ message: "Expense recorded successfully", expense });
    } catch (err) {
        res.status(500).json({ error: "Internal server error" });
    }
}

async function handleGetUserExpenses(req, res) {
    const userId = req.user.userId;
    const {startDate, endDate} = req.body;

    let whereClause = {
        user_id: userId
    };
    if(typeof startDate == 'number' && typeof endDate == 'number' ){
        whereClause = {
            ...whereClause,
            expense_date: {
                [Op.between]: [startDate, endDate]
            }
        }
    }
    
    if(!userId){
        return res.status(404).json({ error: "Unauthorised request." });
    }

    const expenses = await Expense.findAll({ 
        where: whereClause,
        include: [{
            model: Category,
            as: 'category',   // Alias must match the model association
            attributes: ['id', 'name'] // will return necessary fields
        }],
        attributes: {
            exclude: ['category_id']
        }
    });
    res.json({ expenses });
}

module.exports = {
    handleAddExpense,
    handleGetUserExpenses
}