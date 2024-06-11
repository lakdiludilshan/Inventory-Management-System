 const dotenv = require('dotenv').config();
 const express = require('express');
 const mongoose = require('mongoose');
 const bodyParser = require('body-parser');
 const cors = require('cors');
 const UserRoute = require('./routes/UserRoute');

 const app = express();

 //Middlewares
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use(bodyParser.json());

 //Routes Middleware
    app.use('/api/users', UserRoute);

 //Routes
 app.get("/", (req, res) => {
     res.send("Hello Page")
 })
 
 //Connect to DB and Start server
 const PORT = process.env.PORT || 5000;
 
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {

        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`)

        })
    })
    .catch((err) => 
        console.log(err))