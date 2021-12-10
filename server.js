const express = require("express");
const path = require("path");
const mongoose = require('mongoose');
const serverless = require('serverless-http')
require("dotenv").config()
const { router, routerRange } = require('./routes/workoutRouter')
const app = express()

// process.env.MONGO_URL

const URL = `mongodb+srv://mgriggs31:Ma93tthew!@serverlessinstance0.76exb.mongodb.net/Fitness-Tracker?retryWrites=true&w=majority`;

const URL2 = `mongodb+srv://mgriggs31:${process.env.PASSWORDMONGO}@serverlessinstance0.76exb.mongodb.net/Fitness-Tracker?retryWrites=true&w=majority`;

mongoose.connect(`mongodb+srv://mgriggs31:Ma93tthew!@serverlessinstance0.76exb.mongodb.net/Fitness-Tracker?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => { 
    console.log("My DB is running")
 })
 .catch((err) => { 
     console.log(`An error occurred: ${err}`)
  })


app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use(express.static('public'))

app.use('/', router);
app.use('/', routerRange);

app.get("/exercise", (req,res) => {
    res.sendFile(path.join(__dirname + '/public/exercise.html'))
})

app.get("/stats", (req,res) => {
    res.sendFile(path.join(__dirname + '/public/stats.html'))
})

app.listen(process.env.PORT, () => {
    console.log(`server is running on ${process.env.PORT}`)
})


  