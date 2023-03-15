const express = require('express');
const router = express.Router();
const Rents = require('../Models/RentModel')


const getrents = async function (req,res,next) {
    let rent;
    try {
        rent = await Rents.findById(req.params.id);
        if(rent == null) {
            return res.status(404).json({message : "Cannot find User"});
        }
    } catch (error) {
        return res.status(500).json({message : error.message})
    }
    res.rent = rent;
    next(); // starts executing the next lines of code
} // function for getting rents by id

router.get('/', async (req, res) => {
    try {
        const rents = await Rents.find({});
        res.status(200).json({rents});
    } catch (error) {
        res.status(500).json({message : error.message});
    }
    // res.send('Hello from get');
});

router.post('/', async (req, res) => {
    const location = req.body.location;
    const pickupdate = req.body.pickup;
    const returndate = req.body.return;
    const [year1, month1, date1] = pickupdate.split('-');
    const [year2, month2, date2] = returndate.split('-');
    var finalDay = date2 - date1;
    finalDay = Math.abs(finalDay);
    const payable = finalDay*1000; 
    try {        
        // console.log(finalDay);
        // const returnedvalue = await User.findOne({username:username});
        // daybasis(no_of_days);
        const RentCar = new Rents({
            location:location,
            pickup:pickupdate,
            return:returndate,
            pay: payable
        })
        const rented = await RentCar.save();
        res.status(201).json({newRent});
    } catch (error) {
        res.status(500).json({message : error.message});
    }
}); // post function -> creates documents in the database

router.patch('/:id',  getrents, async (req, res) => {
    if(req.body.name != null) {
        res.rent.name = req.body.name;
    }
    if(req.body.location != null) {
        res.rent.location = req.body.location;
    }
    if(req.body.pickup != null) {
        res.rent.pickup = req.body.pickup;
    }
    if(req.body.return != null) {
        res.rent.return = req.body.return;
    }
    try {
        const updatedRents = await res.rent.save();
        res.json(updatedRents);
    } catch (err) {
        res.json({message:err.message});
    }
});

router.delete('/:id', getrents, async (req, res) => {
    try {
        await res.rent.remove();
        res.json({message: 'Rent Deleted'})
    } catch (err) {
        res.status(500).json({message: err.message});
    }
});

module.exports = router;