const express = require('express')
const { connect } = require('./config/db')
const {Bookmodel}= require("./modals/books.modal")

const cors = require('cors')

require('dotenv').config()


const app = express();
app.use(cors())
app.use(express.json())

app.get("/", (req, res) => {
    res.send("Yee Student hai kya ?")
})

app.get("/books",async(req,res)=>{
    try {
        let data = await Bookmodel.find();
        res.status(200).send(data)
    } catch (error) {
        res.status(408).send({msg:"something went wrong",error})
        
    }

})

app.listen(process.env.PORT, async () => {
    try {
        connect()
        console.log("Your server is running at http://localhost:4800")

    } catch (error) {
        console.log(error)

    }

})