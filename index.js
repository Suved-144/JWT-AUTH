const express = require('express');
const authroutes = require('./routes/auth');
const postroute = require('./routes/post')
const app = express();
const dotenv = require('dotenv')
const mongoose = require('mongoose');
const { post } = require('./routes/auth');
dotenv.config();
mongoose 
 .connect(process.env.MONOGO_URI,)   
 .then(() => console.log("Database connected!"))
 .catch(err => console.log(err));

//middleware
app.use(express.json());

//Route middleware
app.use('/api/user',authroutes) 
app.use('/api/user',postroute)



app.listen(process.env.PORT,()=>{
    console.log(`The App is listning on ${process.env.PORT}`)

})