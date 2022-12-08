url = "mongodb+srv://smart-rack:smartrack@cluster0.jngf8sf.mongodb.net/?retryWrites=true&w=majority"
require("dotenv").config()
const mongoose = require('mongoose')

mongoose.connect( url, {
    useNewUrlParser : true,
    useUnifiedTopology: true
}).then(() => {
    console.log("DB connected")
}).catch(() =>{
    console.log("Err connecting Db")
})