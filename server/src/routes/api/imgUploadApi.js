const { imageUplaodController, deleteImage } = require('../../controllers/imageUploads')
const multer  = require('multer')
const imgUploadApi=require('express').Router()
const upload = multer({ dest: 'uploads/' })
imgUploadApi.post('/imgUpload', upload.single('image'),imageUplaodController)
imgUploadApi.delete('/imgUpload',deleteImage)

module.exports={
    imgUploadApi,
}