 const dotenv = require('dotenv').config();
 const express = require('express');
 const mongoose = require('mongoose');
 const bodyParser = require('body-parser');
 const cors = require('cors');
 const UserRoute = require('./routes/UserRoute');
 const CategoryRoute = require('./routes/CategoryRoute');
 const CustomerRoute = require('./routes/CustomerRoute');
 const errorhandeler = require('./middleware/ErrorMiddleware');
 const cookieParser = require('cookie-parser');
 require('events').EventEmitter.defaultMaxListeners = 20;

 const app = express();

 //Middlewares
    app.use(express.json());
    app.use(cookieParser({
        httpOnly: true,
        secure: true,
        sameSite: 'none'
    }));
    app.use(express.urlencoded({ extended: false }));
    app.use(bodyParser.json());
    app.use(cors({
        origin: 'http://localhost:5173',
        credentials: true
    }));

 //Routes Middleware
    app.use('/api/users', UserRoute);
    app.use('/api/categories', CategoryRoute);
    app.use('/api/customers', CustomerRoute);

 //Routes
 app.get("/", (req, res) => {
     res.send("Hello Page")
 })

 //Error Handler
    app.use(errorhandeler);
 
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