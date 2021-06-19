require('dotenv').config()
const express = require('express')

const bodyParser = require('body-parser')
const connectDB = require('./server/database/connection');

const app = express()

connectDB();

app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine", "ejs") 
app.use(express.static('public'))

app.use('/', require('./server/routes/routers'))

let port = process.env.PORT;
if (port == null || port == "") {
  port = 8000;
}
app.listen(port, () => {
    console.log("App running");
    console.log(port);
});

