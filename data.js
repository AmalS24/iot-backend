const mongoose = require('mongoose')
const Schema = mongoose.Schema

const newSchema = new Schema({
    weight: Number,
    timeStamp : String
})

const data = mongoose.model('data', newSchema)
module.exports = data