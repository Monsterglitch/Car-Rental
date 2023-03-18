// const express = require('express');
// const router = express.Router();
const db = require('../Models')

const signuproute = async (req, res) => {
    try {
        // const username = req.body.username;
        // const password = req.body.password;
        // const returned = await User.findOne({username:username});
        // if(returned.password === password) {
        //     res.status(201).render('pages/index');
        // }
        const registerUser = new db.UserModel({
            username:req.body.username,
            password:req.body.password,
            email:req.body.email,
            phone:req.body.phone
        })
        const registered = await registerUser.save();
        res.status(201).render('pages/index');

    } catch (err) {
        res.status(404).render('pages/signuperrorpage');
        // res.status(400).json({message:err.message});
        // console.log({message:err.message});
    }
};

// router.post('/', async (req, res) => {
//     const User = new Users({
//         username: req.body.username,
//         password: req.body.password,
//         email: req.body.email,
//         phone: req.body.phone,
//     });
//     try {
//         const newUser = await User.save();
//         res.status(201).json({newUser});
//     } catch (error) {
//         res.status(500).json({message : error.message});
//     }
// });

module.exports = signuproute;
// module.exports = router.post;