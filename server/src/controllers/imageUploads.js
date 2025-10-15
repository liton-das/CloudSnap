const generateShortCode = require("../helper/generateShortCode");
const UploadImage = require("../model/imageHostModel");
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
  await new UploadImage({
    imageLink:imgUrl
  }).save()
  console.log(imgUrl)
  return res.status(201).json(imgUrl)
}
// delete image 
const deleteImage=async(req,res)=>{
    const {imgId}=req.body
    cloudinary.uploader.destroy(imgId)
    res.status(200).json({message:'image deleted successfully'})
}
module.exports = {
    imageUplaodController,
    deleteImage
}