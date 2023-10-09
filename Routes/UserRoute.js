const express = require('express');
// const router = express.Router();
const app = express();
const db = require('../Models')
const User = require('../Models/UserModel')
// const Rent = require('../Models/RentModel')
// const db = require("../Models");


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

// app.get('/:id', getusers, async (req, res) => {
//     res.json(res.user);
// }); // get function with id

// const getAllTasks = async (request, response) => {
//     try {
//         const tasks = await Task.find({})
//         response.status(200).json({tasks})
//     } catch (error) {
//         response.status(500).json({msg : error})
//     }
// }
// app.get("/", function(req,res) {
//     User.find({})
//     .then(function(Users) {
//       res.json(Users);
//     })
//     .catch(function(err) {
//       res.json(err);
//     })
// });

// app.post('/User', function(req, res) => {
//     User.create(req.body)
//     .then(function(err) {
//         res.json(User);
//     })
//     .catch(function(err) {
//         res.json(err);
//     })
// })
app.post('/User', async (req, res) => {
    try {
        const users = await db.UserModel.create(req.body);
        res.status(200).json({users});
    } catch (error) {
        res.status(500).json({message : error.message});
    }
    // res.send('Hello from get');
});

app.get('/Users', async (req, res) => {
    try {
        const users = await db.UserModel.find({});
        res.status(200).json({users});
    } catch (error) {
        res.status(500).json({message : error.message});
    }
    // res.send('Hello from get');
}); // get function without id

app.get('/Rents', async (req, res) => {
    try {
        const rents = await db.RentModel.find({});
        res.status(200).json({rents});
    } catch (error) {
        res.status(500).json({message : error.message});
    }
    // res.send('Hello from get');
});

app.post('/User/:id', async (req, res) => {
    db.RentModel.create(req.body)
    .then(function(Rent) {
        return db.UserModel.findOneAndUpdate({_id: req.params.id}, {rentDetails: Rent._id}, {new: true});
    })
    .then(function(User) {
        res.json(User);
    })
    .catch(function(err) {
        res.json(err);
    })
})

app.get('/Users/:id', async (req, res) => {
    db.UserModel.findOne({_id: req.params.id})
    .populate({path:'rentDetails'})
    .then(function(User) {
        res.json(User);
    })
    .catch(function(err) {
        res.json(err)
    })
})




app.post('/', async (req, res) => {
    const User = new db.UserModel({
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



app.delete('/:id', getusers, async (req, res) => {
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

module.exports = app;