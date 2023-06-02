const mongoose = require('mongoose')

const connect=async()=>{
    try {
        await mongoose.connect("mongodb+srv://dinesh:sengar@cluster0.bsxdwit.mongodb.net/Bookstore")
        console.log("connected to server")
        
    } catch (error) {
        console.log(error)
        
    }

}
module.exports={connect}