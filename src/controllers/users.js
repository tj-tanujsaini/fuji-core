const { ValidationError } = require("sequelize");
const CryptoJS = require('crypto-js');
const { User } = require('../models');

const CRYPTO_SECRET_KEY = process.env.CRYPTO_SECRET_KEY;

const decryptPassword = (encryptedPassword) => {
    const bytes = CryptoJS.AES.decrypt(encryptedPassword, CRYPTO_SECRET_KEY);
    return bytes.toString(CryptoJS.enc.Utf8);
};

async function handleGetAllUsers(req, res) {
    try {
        const users = await User.findAll();
        res.json({
            length: users.length,
            users
        });
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
}

async function handleAddNewUser(req, res) {
    const { email, name, user_name, password } = req.body;
    // validate user data
    if (!email || !name || !user_name || !password) {
        res.status(400).json({ error: "All Fields are required" });
    }

    try {
        const decryptedPassword = decryptPassword(password);
        const newUser = await User.create({name, email, user_name, password: decryptedPassword});
        res.status(201).json({
            message: "User created successfully",
            user: newUser
        });
    } catch (err) {
        if (err instanceof ValidationError) {
            // Extract all validation messages
            const validationErrors = err.errors.map(error => {
                let customMessage = error.message; // Default message
            
                // Customize error messages for specific fields
                if (error.path === "email") {
                    customMessage = "Email already registered";
                } else if (error.path === "user_name") {
                    customMessage = "Username is already taken";
                }
            
                return {
                    field: error.path,
                    message: customMessage
                };
            });

            return res.status(400).json({ errors: validationErrors });
        }
        return res.status(500).json({ error: "Internal server error" });
    }
}

async function handleGetUserById(req, res) {
    const userId = req.params.id;
    try {
        const user = await User.findOne({
            where: {id: userId}
        });
        if (!user) {
            return res.status(404).json({ error: "User not found!" });
        }
        return res.status(200).json(user);
    } catch (err) {
        return res.status(500).json({ error: "Internal server error" });
    }
}

async function handleUpdateUserById(req, res){
    const userId = req.params.id;
    const { name, user_name } = req.body;
    try {
        const user = await User.findOne({where: {id: userId}});
        if(!user){
            return res.status(404).json({ error: "User not found!" });
        }
        await user.update({
            name: name || user.name,
            user_name: user_name || user.user_name
        });
        return res.status(200).json({
            message: "User Update Successfully",
            user: user
        });
    } catch (err) {
        if (err instanceof ValidationError) {
            // Extract all validation messages
            const validationErrors = err.errors.map(error => ({
                field: error.path,  // The field that caused the error
                message: error.message
            }));

            return res.status(400).json({ errors: validationErrors });
        }
        return res.status(500).json({ error: "Internal server error" });
    }
}

module.exports = {
    handleGetAllUsers,
    handleAddNewUser,
    handleGetUserById,
    handleUpdateUserById
}