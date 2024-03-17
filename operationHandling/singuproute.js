const db = require('../Models')

const signuproute = async (req, res) => {
    try {
        const registerUser = new db.UserModel({
            username:req.body.username,
            password:req.body.password,
            email:req.body.email,
            phone:req.body.phone
        })
        registerUser.save();
        res.status(201).render('pages/index');

    } catch (err) {
        res.status(404).render('pages/signuperrorpage');
    }
};

module.exports = signuproute;