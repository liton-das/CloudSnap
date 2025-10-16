const imageHostModel = require('../model/imageHostModel');

const cloudinary = require('cloudinary').v2
// cloudinary configuration
 cloudinary.config({
   cloud_name: "dwjtuk5wr",
   api_key: "596796834932469",
   api_secret: "w3rPiEZ1uAY5ZNJTAQJh8-A80sg", // Click 'View API Keys' above to copy your API secret
 });

const imageUplaodController=async(req,res)=>{
    const img = req.file
    // upload image on cloudinary
const uploadResult = await cloudinary.uploader
  .upload(img.path, {
    public_id: Date.now(),
  })
  .catch((error) => {
    console.log(error);
  });
  const imgUrl = uploadResult.url
     await new imageHostModel({
    imageLink:imgUrl
  }).save()
  return res.status(201).json(imgUrl)
}
// delete image 
const deleteImage=async(req,res)=>{
    try {
      // const {imgId}=req.body
      const {id}=req.params
    // if(!imgId){
    //   return res.status(404).json({message:'image Id not found!'})
    // }
    if(id){
      await imageHostModel.findByIdAndDelete({_id:id})

    }
    // await cloudinary.uploader.destroy(imgId)
    res.status(200).json({message:'image deleted successfully'})
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