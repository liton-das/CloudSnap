const { default: mongoose } = require("mongoose")

const dbConnection =async()=>{
    try {
        await mongoose.connect(`${process.env.DB_CONNECT}`)
        console.log('db connected')
    } catch (error) {
        console.log('db not connected!')
    }
}
module.exports = dbConnection