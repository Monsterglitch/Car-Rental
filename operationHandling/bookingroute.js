const db = require('../Models')

const bookingroute = async (req, res) => {
    const username = req.body.username;
    const location = req.body.location;
    const pickupdate = req.body.pickup;
    const returndate = req.body.return;
    const [year1, month1, date1] = pickupdate.split('-');
    const [year2, month2, date2] = returndate.split('-');
    var finalDay = (date2 - date1) + 1;
    finalDay = Math.abs(finalDay);
    const payable = finalDay*1000; 
    try {        
        const RentCar = new db.RentModel({
            username:username,
            location:location,
            pickup:pickupdate,
            return:returndate,
            pay:payable
        })
        RentCar.save();
        res.status(201).render('pages/index');

    } catch (err) {
        console.log("Problem in booking Cars");
    }
};


module.exports = bookingroute;