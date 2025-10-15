const { imgUploadApi } = require('./api/imgUploadApi')
const route = require('express').Router()
route.use('/img',imgUploadApi)
module.exports = route