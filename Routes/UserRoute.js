const express = require('express');
const router = express.Router();
const Users = require('../Models/UserModel')

const getusers = async function (req,res,next) {
    let user;
    try {
        user = await Users.findById(req.params.id);
        if(user == null) {
            return res.status(404).json({message : "Cannot find User"});
        }
    } catch (error) {
        return res.status(500).json({message : error.message})
    }
    res.user = user;
    next(); // starts executing the next lines of code
} // function for getting users by id

router.get('/:id', getusers, async (req, res) => {
    res.json(res.user);
}); // get function with id

router.get('/', async (req, res) => {
    try {
        const users = await Users.find({});
        res.status(200).json({users});
    } catch (error) {
        res.status(500).json({message : error.message});
    }
    // res.send('Hello from get');
}); // get function without id
// const getAllTasks = async (request, response) => {
//     try {
//         const tasks = await Task.find({})
//         response.status(200).json({tasks})
//     } catch (error) {
//         response.status(500).json({msg : error})
//     }
// }

router.post('/', async (req, res) => {
    const User = new Users({
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
        phone: req.body.phone,
    });
    try {
        const newUser = await User.save();
        res.status(201).json({newUser});
    } catch (error) {
        res.status(500).json({message : error.message});
    }
}); // post function -> creates documents in the database



router.delete('/:id', getusers, async (req, res) => {
    try {
        await res.user.remove();
        res.json({message: 'User Deleted'})
    } catch (err) {
        res.status(500).json({message: err.message});
    }
});

// router.patch('/:id', (req, res) => {
//     res.send(`Hello from patch ${req.params.id}`)
// });

module.exports = router;