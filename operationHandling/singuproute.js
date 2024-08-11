const db = require('../Models');
const bcrypt = require('bcrypt');

const signuproute = async (req, res) => {
    try {
        const password = req.body.password;
        const hashedPassword = await bcrypt.hash(password, 10);
        const registerUser = new db.UserModel({
            username:req.body.username,
            password:hashedPassword,
            email:req.body.email,
            phone:req.body.phone
        })
        registerUser.save();
        res.status(201).redirect('/');

    } catch (err) {
        res.status(404).json({ "Error" : "Error in Signing up" });
    }
};

module.exports = signuproute;