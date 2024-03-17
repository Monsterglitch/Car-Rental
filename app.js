// const { MongoClient, ServerApiVersion } = require('mongodb');
// const { getDb, connectToDb } = require('./db/connect')
const express = require('express');
const connectDB = require('./db/connect');
const mongoose = require('mongoose');
const LoginRoute = require('./operationHandling/loginroute');
const signupRoute = require('./operationHandling/singuproute');
const bookingRoute = require('./operationHandling/bookingroute');
const app = express();
require('dotenv').config(); // for env files
const bodyParser = require('body-parser');
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true })); // To parse data in the body
app.set("view engine", "ejs"); // using template engine
mongoose.set('strictQuery', true); // To avoid Deprecation WARNINGS
app.use(express.static('./public'));
app.use(express.json());


// const path = require('path');
// const favicon = require('serve-favicon');
// app.use(favicon(path.join(__dirname, 'public', 'logo.ico')));

// app.use('/favicon.ico', express.static('Images/favicon.ico'));
// app.use(favicon(__dirname + '/favicon.ico'));
// app.use('/favicon.ico', express.static('Images/favicon.ico'));

// const UserRoutes = require('./Routes/UserRoute')
// app.use('/', UserRoutes)
// const RentRoutes = require('./Routes/RentRoute');
// app.use('/Rent', RentRoutes)


// home page
app.get('/', function(req, res) {
    res.render('pages/index');
}); // rendering the page
app.post('/', function(req, res) {
    bookingRoute(req,res);
}); // validating the form

// registration page
app.get('/registration', function(req, res) {
    res.render('pages/registration');
}); // rendering the page
app.post('/registration', async (req,res) => {
    signupRoute(req, res);
}) // validating the form


// Connect using MongoDB ODM
// const client = new MongoClient(process.env.MONGO_URI, {
//     serverApi: {
//       version: ServerApiVersion.v1,
//       strict: true,
//       deprecationErrors: true,
//     }
// });

const port = 3000;
const start = async () => {
    try {
        // await client.db("Car-Rental").command({ ping: 1 });
        // console.log("Pinged your deployment. You successfully connected to MongoDB!");
        await connectDB(process.env.MONGO_URI);
        app.listen(port, console.log(`Server is listening on ${port}`));
    } catch (error) {
        console.log(error);
    }
}
start().catch(console.dir); // server starts


