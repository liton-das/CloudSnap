const { Schema, model } = require("mongoose");

const imageSchema = new Schema({
    imageLink:{
        type:String,
        required:true
    }
},{timestamps:true})

module.exports = model('uploadImage',imageSchema)
