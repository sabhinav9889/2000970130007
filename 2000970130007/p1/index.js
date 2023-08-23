const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const app = express();
app.use(express.urlencoded({ extended: false }));
const routerAuth = require('./router/auth');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const PORT = process.env.PORT || 3000;
const url = process.env.URL;

mongoose.connect(url).then(()=> console.log("connect to db")).catch((err)=>{
    console.log("There is an error to connect to db", err);
});

app.use(bodyParser.urlencoded({ extended: false }));        

app.use(bodyParser.json());

app.use('/train', routerAuth);

app.listen(PORT, ()=>{
    console.log('listening on port ' + PORT);
})