const imageHostModel = require('../model/imageHostModel');
const fs = require('fs')
const cloudinary = require('cloudinary').v2
// cloudinary configuration
 cloudinary.config({
   cloud_name: "dwjtuk5wr",
   api_key: "596796834932469",
   api_secret: "w3rPiEZ1uAY5ZNJTAQJh8-A80sg", // Click 'View API Keys' above to copy your API secret
 });

const imageUplaodController=async(req,res)=>{
 try {
   const image = req.file;
   // upload image on cloudinary
   const uploadResult = await cloudinary.uploader
     .upload(image.path, {
       public_id: Date.now(),
     })
     .catch((error) => {
       console.log(error);
     });
   fs.unlinkSync(image.path)
  let imgUrl =  await new imageHostModel({
     imageLink: uploadResult.url,
    }).save();
   return res.status(201).json(imgUrl);
 } catch (error) {
  fs.unlinkSync(image.path)
  return res.status(500).json({message:'Internal server error!'})
 }
}
// delete image 
const deleteImage=async(req,res)=>{
  try {
      const {imgLink} = req.params
      const existImg = await imageHostModel.findOne({imgLink:imgLink._id})
      if(!existImg){
        return res.status(404).json({message:'existing image not found!'})
      }
      const imgId = existImg.imageLink.split('/')[7].split('.')[0]
      await imageHostModel.findByIdAndDelete(existImg)
      await cloudinary.uploader.destroy(imgId)
      return res.status(200).json({message:'delete successfully!'})
    } catch (error) {
      console.log(error)
    }
}
// get all images 
const getAllImagesController =async(req,res)=>{
  try {
    const images = await imageHostModel.find().sort({createdAt:-1})
    res.status(200).json(images)
  } catch (error) {
    console.log(error)
  }
}
module.exports = {
    imageUplaodController,
    deleteImage,
    getAllImagesController
}