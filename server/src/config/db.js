const { default: mongoose } = require("mongoose")

const dbConnection =async()=>{
    try {
        await mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.83ortx4.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority&appName=Cluster0`)
        console.log('db connected')
    } catch (error) {
        console.log('db not connected!')
    }
}
module.exports = dbConnection