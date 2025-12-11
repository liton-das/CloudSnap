const { default: mongoose } = require("mongoose")

const dbConnection =async()=>{
    try {
        await mongoose.connect(`mongodb://localhost:27017/CloudSnap?directConnection=true`)
        console.log('db connected')
    } catch (error) {
        console.log('db not connected!')
    }
}
module.exports = dbConnection