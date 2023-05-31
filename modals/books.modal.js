const express = require('express')
const mongoose = require('mongoose')


const bookschema = mongoose.Schema({
    title:{type:String,required:true},
    author:{type:String,required:true},
    image:{type:String,required:true},
    description:{type:String,required:true},
})

const Bookmodel= mongoose.model("Book",bookschema,"Books");
module.exports = {Bookmodel}