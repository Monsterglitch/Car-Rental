// const formDOM = document.querySelector('.form-container');
// const locationInputDOM = document.getElementById('location');
// const pickupDOM = document.getElementById('Pick-Up');
// const returnDOM = document.getElementById('Return');
// const returnMeridianDOM = document.getElementById('Return-Meridian');
// const pickupMeridianDOM = document.getElementById('Pick-Up-Meridian');
const Rent = require('../Models/RentModel');

// formDOM.addEventListener('submit', async (e) => {
//     e.preventDefault();
// });

const bookingroute = async (req, res) => {
    const username = req.body.username;
    const location = req.body.location;
    const pickupdate = req.body.pickup;
    const returndate = req.body.return;
    const [year1, month1, date1] = pickupdate.split('-');
    const [year2, month2, date2] = returndate.split('-');
    var finalDay = (date2 - date1) + 1;
    // console.log(finalDay)
    finalDay = Math.abs(finalDay);
    const payable = finalDay*1000; 
    try {        
        // console.log(finalDay);
        // const returnedvalue = await User.findOne({username:username});
        // daybasis(no_of_days);
        const RentCar = new Rent({
            username:username,
            location:location,
            pickup:pickupdate,
            return:returndate,
            pay: payable
        })
        const rented = await RentCar.save();
        res.status(201).render('pages/index');

    } catch (err) {
        res.status(404).render('pages/error');
        // res.status(400).json({message:err.message});
        // console.log({message:err.message});
    }
};

// var a= 5  //get the days that is start and end date (end date - start date)
// var b=daybasis(a)
// console.log(a)
// console.log("Total amount is:"+b)


module.exports = bookingroute;