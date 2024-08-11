const db = require('../Models')


const loginroute = async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    try {
        const returned = await db.UserModel.findOne({username:username});
        if(returned.password === password) {
            res.status(201).redirect('/');
        }
    } catch (err) {
        res.status(404).json({ "Error" : "Error in Signing in" });
    }
};

module.exports = loginroute;
