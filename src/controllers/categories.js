const { ValidationError } = require("sequelize");
const { Category } = require ('../models');
const category = require("../models/category");

async function handleGetAllCategories(req, res) {
    try{
        let categories = await Category.findAll();
        categories.sort((a, b) => a.name.localeCompare(b.name));
        res.status(200).json({
            length: categories.length,
            categories
        });
    }catch (err){
        res.status(500).json({ error: "Internal server error" });
    }
}

async function handleAddCategory(req, res) {
    const {name} = req.body;
    if(!name){
        return res.status(400).json({ error: "Name is required" });
    }
    try{
        const category = await Category.create({name});
        res.status(201).json({ message: "Expense recorded successfully", category });
    }catch (err){
        if (err instanceof ValidationError) {
            // Extract all validation messages
            const validationErrors = err.errors.map(error => ({
                field: error.path,  // The field that caused the error
                message: error.message
            }));

            return res.status(400).json({ errors: validationErrors });
        }
        res.status(500).json({ error: "Internal server error" });
    }
}

module.exports = {
    handleAddCategory,
    handleGetAllCategories
}