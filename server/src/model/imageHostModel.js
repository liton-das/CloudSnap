const { Schema, model } = require("mongoose");

const imageSchema = new Schema({
    imageLink:{
        type:String,
        required:true
    }
},{timestamps:true})

const UploadImage = model('uploadImage',imageSchema)
module.exports=UploadImage