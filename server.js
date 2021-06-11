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

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log("Server running on port 3000");
})

