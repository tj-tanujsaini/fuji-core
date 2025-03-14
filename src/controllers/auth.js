require("dotenv").config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const CryptoJS = require('crypto-js');
const { Op } = require("sequelize");
const {User} = require('../models');

const SECRET_KEY = process.env.JWT_SECRET;
const CRYPTO_SECRET_KEY = process.env.CRYPTO_SECRET_KEY;

const decryptPassword = (encryptedPassword) => {
    const bytes = CryptoJS.AES.decrypt(encryptedPassword, CRYPTO_SECRET_KEY);
    return bytes.toString(CryptoJS.enc.Utf8);
};

async function handleUserLogin(req, res){
    const {email, password: encPassword} = req.body;
    if (!email || !encPassword) {
        return res.status(400).json({ error: "Email/User and password are required" });
    }
    try{
        // find user
        const user = await User.findOne({
            where: {
                [Op.or]: [
                    { email: email },
                    { user_name: email }
                ]
            },
            attributes: ['id', 'name', 'email', 'user_name', 'password']
        });
        if(!user){
            return res.status(404).json({ error: "User not registered" });
        }
        // compare credentials
        const loginPassword = decryptPassword(encPassword);
        const isMatch = await bcrypt.compare(loginPassword, user.password);
        if(!isMatch){
            return res.status(401).json({ error: "Invalid Credentials" });
        }
        // generate GWT token
        const token = jwt.sign({userId: user.id, email: user.email}, SECRET_KEY, { expiresIn: "24h"});
        const userResponse = user.toJSON();
        delete userResponse.password;

        res.status(200).json({ token: token, user: userResponse });
    }catch (err){
        res.status(500).json({ message: "Internal Server Error" });
    }
}

module.exports = {
    handleUserLogin
};