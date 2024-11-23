// yo file ma chai hami le db ko collection and fields haru banauna use garxam
const mongoose = require('mongoose')
const Schema =mongoose.Schema
const bookSchema=new Schema({
    bookName:{
        type:String,
        unique:true
    },
    bookPrice:{
        type:String
    },
    isbNum:{
        type:Number
    },
    publishedAt:{
        type:String
    },
    bookPublication:{
        type:String
    },
    bookAuthorName:{
        type:String
    },
    offer:{
        type:String

    },
    imageUrl :{
        type: String
        
    }
})
const book=mongoose.model("book",bookSchema)
module.exports=book
