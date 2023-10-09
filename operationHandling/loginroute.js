const db = require('../Models')


const loginroute = async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    try {
        const returned = await db.UserModel.findOne({username:username});
        if(returned.password === password) {
            res.status(201).render('pages/index');
        }
    } catch (err) {
        res.status(404).render('pages/loginerrorpage');
    }
};

module.exports = loginroute;
