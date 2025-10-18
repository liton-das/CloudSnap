const { imageUplaodController, deleteImage, getAllImagesController } = require('../../controllers/imageUploads')
const multer  = require('multer')
const imgUploadApi=require('express').Router()
const upload = multer({ dest: 'uploads/' })
imgUploadApi.post('/imgUpload', upload.single('image'),imageUplaodController)
imgUploadApi.delete('/deleteImg',deleteImage)
imgUploadApi.get('/',getAllImagesController)

module.exports={
    imgUploadApi,
}