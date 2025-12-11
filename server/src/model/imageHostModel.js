const { Schema, model } = require("mongoose");

const imageSchema = new Schema({
    imageLink:{
        type:String,
        required:true
    },
    size:{
        type:String,
        default:null
    }
},{timestamps:true})

module.exports = model('uploadImage',imageSchema)
