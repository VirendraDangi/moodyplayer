const express = require("express")
const songRoute = require("./routes/song.routes")
const cors = require("cors")



const app = express()
 app.use(express.json())
app.use(cors())
 app.use("/",songRoute)            //  this is basically mean we are telling the express that we created this route


module.exports = app